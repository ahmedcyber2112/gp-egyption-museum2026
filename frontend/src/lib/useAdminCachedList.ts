"use client";

import { useCallback, useEffect, useState } from "react";
import {
  cachedMuseumRequest,
  getCachedMuseumList,
  hasCachedMuseum,
  setCachedMuseum,
} from "./museumCache";

type ApiListResponse<T> = {
  data?: T[];
  success?: boolean;
};

type Loader<T> = () => Promise<ApiListResponse<T>>;

/**
 * Admin list hook: show cached data instantly on reload, refresh in background.
 */
export function useAdminCachedList<T>(cacheKey: string, loader: Loader<T>) {
  const [items, setItems] = useState<T[]>(() => getCachedMuseumList(cacheKey) as T[]);
  const [loading, setLoading] = useState(
    () => typeof window === "undefined" || !hasCachedMuseum(cacheKey),
  );
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(
    async ({ forceNetwork = false }: { forceNetwork?: boolean } = {}) => {
      const hasCache = hasCachedMuseum(cacheKey);
      if (!hasCache || forceNetwork) {
        if (!hasCache) setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError("");
      try {
        let response: ApiListResponse<T>;
        if (hasCache && !forceNetwork) {
          response = (await cachedMuseumRequest(cacheKey, loader)) as ApiListResponse<T>;
        } else {
          response = await loader();
          setCachedMuseum(cacheKey, response);
        }
        setItems(Array.isArray(response?.data) ? response.data : []);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load data.";
        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [cacheKey, loader],
  );

  useEffect(() => {
    void reload();
  }, [reload]);

  return { items, setItems, loading, refreshing, error, reload };
}
