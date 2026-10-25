import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Khong the tai thong tin san pham");
      }
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  if (!phone) {
    return <Loading message="Dang tai du lieu tu API..." />;
  }

  return <SelectPhoneApp phone={phone} />;
}
