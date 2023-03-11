"use client"

import "./index.css"
import { useCallback, useEffect, type RefObject } from "react"
import Quagga, {type QuaggaJSResultObject, type QuaggaJSResultObject_CodeResult, type QuaggaJSReaderConfig, type QuaggaJSCodeReader} from '@ericblade/quagga2';

function getMedian(arr: number[]) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    return arr[half] || 0;
}

function getMedianOfCodeErrors(decodedCodes: QuaggaJSResultObject_CodeResult["decodedCodes"]) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error || 0);
    const medianOfErrors = getMedian(errors);
    return medianOfErrors;
}

const defaultConstraints = {
    width: 340,
    height: 240,
};

const defaultLocatorSettings = {
    patchSize: 'medium',
    halfSample: true,
};

const defaultDecoders: (QuaggaJSReaderConfig | QuaggaJSCodeReader)[] = ['ean_reader'];

const Scanner = ({
  onDetected,
  scannerRef,
  facingMode = "environment",
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  numOfWorkers = navigator.hardwareConcurrency || 0,
  decoders = defaultDecoders,
  locate = true,
} : {
  onDetected: (result: QuaggaJSResultObject) => Promise<void>,
  scannerRef: RefObject<HTMLDivElement>,
  facingMode?: string,
  constraints?: typeof defaultConstraints,
  locator?: typeof defaultLocatorSettings,
  numOfWorkers?: number,
  decoders?: typeof defaultDecoders,
  locate?: boolean,
}) => {
    const errorCheck = useCallback((result: QuaggaJSResultObject) => {
        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);

        if (err < 0.25) {
            onDetected(result).catch((err) => console.error(err));
        }
    }, [onDetected]);

    useEffect(() => {
        Quagga.init({
          inputStream: {
            type: 'LiveStream',
            constraints: {
                ...constraints,
                ...{ facingMode },
            },
            area: {
              top: "20%",
              right: "0%",
              left: "0%",
              bottom: "20%"
            },
            target: scannerRef.current || "",
        },
        locator,
        numOfWorkers,
        decoder: { readers: decoders },
        locate,
        }, (err) => {
            if (err) {
                return console.log('Error starting Quagga:', err);
            }
            Quagga.start()
        })?.catch((err) => console.error(err));
        Quagga.onDetected(errorCheck);
        return () => {
            Quagga.offDetected(errorCheck);
            Quagga.stop()?.catch((err) => console.error(err));
        };
    }, [onDetected, scannerRef, errorCheck, constraints, facingMode, locator, numOfWorkers, decoders, locate]);
    return null;
}

export default Scanner