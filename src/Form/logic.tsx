import { IFieldsOptions } from "./interface"
import React from "react"
import { getType } from "./utils"
import styles from "./index.css"

/**
 * 解析布局 'horizontal' | 'vertical'
 */
export const parsingLayout = (fieldsList: Array<IFieldsOptions>): any[] => {
  let viewArr = []
  let group: any = {}
  let count = 0
  let collect = false
  for (const index in fieldsList) {
    const { layout } = fieldsList[index]
    if (layout === "horizontal") {
      if (collect) {
        group[count] = [...group[count], fieldsList[index]]
      } else {
        count++
        group[count] = [fieldsList[index]]
        viewArr.push(count)
      }
      collect = true
    } else {
      collect = false
      viewArr.push(fieldsList[index])
    }
  }
  return viewArr.map((item: any) => {
    if (getType(item) === "number") {
      return (
        <div key={item} className={styles.horizontal}>
          {group[item].map((i: any) => {
            const { idPath, widgetComponent } = i
            return (
              <div className={styles.item} key={idPath}>
                {widgetComponent}
              </div>
            )
          })}
        </div>
      )
    } else {
      const { idPath, widgetComponent } = item
      return (
        <div className={styles.item} key={idPath}>
          {widgetComponent}
        </div>
      )
    }
  })
}
