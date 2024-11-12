import axios from "@/utils/global/axios";
import type { ResponseType } from "axios";

/**
 * 向指定 URL 发送 GET 请求，并返回解析后的 JSON 数据
 * @param url 请求的 URL
 * @param resType 响应数据的类型，默认为 "json"
 * @param params 请求参数，默认为空
 * @returns 返回类型为 Promise<T>，其中 T 是响应数据的类型
 */
export async function get<T>(
  url: string,
  resType: ResponseType = "json",
  params?: Object,
): Promise<T> {
  return await axios.get(url, { params, responseType: resType });
}

/**
 * 向指定 URL 发送 POST 请求，并返回解析后的 JSON 数据
 * @param url 请求的 URL
 * @param body 请求的主体数据
 * @returns Promise<T>，其中 T 是响应数据的类型
 */
export async function post<T>(
  url: string,
  body: Object | FormData,
): Promise<T> {
  const ctxType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  return await axios.post(url, body, {
    headers: { "Content-Type": ctxType },
    responseType: "json",
  });
}
