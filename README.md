# Installation
```sh
$ npm install
```

# Usage
- developement bundle
  ```sh
  $ npm run dev
  ```
- production bundle
  ```sh
  $ npm run prod
  ```
- frontend hot-reload debug server
  ```sh
  $ npm run watch
  ```
- webpack bundle analyzer
  ```sh
  $ npm run analyzer
  ```
- build fullstack code
  ```sh
  $ npm run build-app
  ```

# 說明
本專案使用SPA開發，因不考慮SEO因素，採CSR機制。並使用PWA來實現一次開發，多平台使用（須搭配RWD實做與SSL）。
目前統計production打包後檔案大小，已vendor.js來說有gzip壓縮為`315.32KB`，沒有壓縮的話為`1.74MB`，目前大體上的容量都會落在ui framework (vuetify)，依照目前不會再加上其他大型framework來說，未來原則上不會增加太多額外容量（應可壓在`500KB`內（不包含圖片）），另外gzip後的檔案大小看起來表現是相當不錯的。（當然未來可在針對Vuetify及material icon進行抽離，只引入需要的內容）

# Docker Container
1. 建置Docker Image
    ```
    docker build -t temperature-record .
    ```

2. 使用

    容器配置：
    - mongodb volume: `/data/db`
    - server port: `3000`

    用例:
    ```
    docker run -v /path/to/you/host/dir/data/db:/data/db -p 3000:3000 temperature-record
    ```

# TODO
- [ ] Babel-node use in production?
- [ ] Dockerfile pre builder cache
- [ ] Dockerfile production install dependency conflict issue 
- [ ] Use two container (docker-compose run two together) split out database and web application
