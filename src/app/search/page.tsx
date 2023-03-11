"use client"

import { type QuaggaJSResultObject } from "@ericblade/quagga2";
import { type NextPage } from "next";
import {useCallback, useRef, useState} from "react"
import Scanner from "~/components/scanner";
import SearchBar from "~/components/searchbar";
import { type Book } from "~/types/book";
import { type BookData, type Data } from "~/types/googleBookApi";
import { FaBarcode } from 'react-icons/fa';
import { BarcodeButton } from "~/components/button";

const Home: NextPage = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const scannerRef = useRef(null);

  const barcodeApi = (async (isbn: string) => {
    
    // ISBNから書籍データを取得する
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    const res = await fetch(url)
    const data = await res.json() as Data

    // 検索した書籍データが存在しないとき
    if (data.totalItems === 0) {
      return
    }

    const bookData = data.items[0] as BookData

    // 書籍データを取得
    const bookInfo: Book = {
      isbn: bookData?.volumeInfo?.industryIdentifiers[1]?.identifier || "isbn",
      title: bookData?.volumeInfo?.title,
      thumbnail: bookData?.volumeInfo?.imageLinks?.thumbnail
    }

    console.log(bookInfo)

    setResults([...results, bookInfo])
  })

  const onDetected = useCallback(async (result: QuaggaJSResultObject) => {
    console.log("onDetected")
    if (result !== undefined) {
      const barcode = result.codeResult.code
      console.log(barcode)
      if (barcode) {
        setScanning(false)
        await barcodeApi(barcode)
        setScanning(true)
      }
    }
  }, [])

  return (
      <div className="flex flex-col items-stretch">
        <div>
        <div id="camera-area" ref={scannerRef} className={`camera-area ${!scanning ? "invisible" : ""}`}>
          <div className="detect-area">
            {scanning &&
              <FaBarcode size={120} color={"black"} />
            }
            {scanning && <Scanner scannerRef={scannerRef} onDetected={onDetected} />}
          </div>
        </div>
        </div>
        <div className="mt-16">
          <BarcodeButton on={scanning} onClick={() => setScanning(!scanning)} />
          <SearchBar />
        </div>
      </div>
  );
};

export default Home;
