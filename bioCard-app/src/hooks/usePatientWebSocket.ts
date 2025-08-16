import { useEffect, useRef } from "react";

export function usePatientWebSocket(onPatientInfo: (data: any) => void) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3000/ws");
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "patientInfo") {
        onPatientInfo(data.patient);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, [onPatientInfo]);
}
