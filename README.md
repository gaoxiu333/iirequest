# iirequest

## 初始化项目

```bash
npm init -y
pnpm add rollup typescript -D
npx tsc --init
```

## 添加 rollup 插件

```bash
pnpm add @rollup/plugin-typescript -D   
pnpm add tslib -D
```

## 参考

[参考1](https://github.com/infinitered/apisauce)
[参考2 vue-admin](https://github.com/Armour/vue-typescript-admin-template/blob/master/src/utils/request.ts)
[参考3 alova](https://github.com/alovajs/alova)

直接在GitHub搜索axios还是挺有收获、

难点应该是 mock 数据？？

websockets 心跳链接也加一下 helper？

## TODO
-  example
-  大文件上传
-  表单提交等多种示例