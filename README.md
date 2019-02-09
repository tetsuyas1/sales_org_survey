# 組織診断サーベイHTML

## 環境構築

- node前提(v10)

```
npm i
npm run build
npm run serve
``` 

## distディレクトリについて

現在、GitHub Pagesのためdistディレクトリを `.gitignore` から除外している

1. featureブランチ側ではコミットしない
1. masterブランチにマージ後にbuildしてコミット

後々には、masterブランチにマージ時にbuildするような仕組みに変更したい
