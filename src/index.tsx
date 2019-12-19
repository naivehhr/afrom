import * as React from "react"
import ReactDOM from "react-dom"

import Home from "./Home"
import styles from "./index.css" // 这种方式要写声明文件

export default function App() {
  return (
    <div className={styles.bingo}>
      <div className={styles.form}>
        <div style={{ color: "red" }}>表单测试</div>
        <Home />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
