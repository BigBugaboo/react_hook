import { map_ListPurchaseTaskRequest_PagingField } from 'gm_api/src/purchase'
import { useState, useEffect, RefObject } from 'react'

/**
 *  监听滚动自动加载，需要动态设置 ref 为最后一个item。
 *  原理是，监听最后的item，是否可见，可见时，触发loading
 *  tip: 默认初始化会自动请求一次
 * @param callBack 加载回调事件
 * @param ref 监听的元素
 */
export const useLoad = <T>(callBack: () => void, ref: RefObject<T>) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    callBack()
  }, [])

  useEffect(() => {
    if (!ref.current) {
      return () => {}
    }

    const node: any = ref.current

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (loading) {
            callBack()
            setLoading(false)
          }
          observer.unobserve(node)
        } else {
          setLoading(true)
        }
      })
    })
    if (node != null) {
      observer.observe(node)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref])
}
