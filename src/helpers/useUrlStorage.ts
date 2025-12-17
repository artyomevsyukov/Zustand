// import { useEffect } from "react"
// import { useSearchParams } from "react-router-dom"
// import type { getCoffeeListReqParams } from "../types/coffeeTypes"

// export function useUrlStorage(
//   params: getCoffeeListReqParams,
//   setParams: (params: getCoffeeListReqParams) => void
// ) {
//   const [queryParams, setQueryParams] = useSearchParams()

//   // 🛠️ URL → State (при изменении URL)
//   const setParamsFromUrl = () => {
//     const textFromUrl = queryParams.get("text")

//     // 🛠️ Обновляем только если значение из URL отличается от текущего
//     if (textFromUrl !== null && textFromUrl !== params.text) {
//       setParams({ text: textFromUrl || undefined })
//     }
//   }

//   useEffect(setParamsFromUrl, [queryParams])

//   // 🛠️ State → URL (при изменении params)
//   useEffect(() => {
//     const newQueryParams = new URLSearchParams()

//     if (params.text) {
//       newQueryParams.set("text", params.text)
//     }

//     // 🛠️ Обновляем URL
//     setQueryParams(newQueryParams)
//   }, [params])
// }

// export default useUrlStorage
