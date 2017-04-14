# Pepagis

元：
https://github.com/pxgrid/aigis/

## Pepagis Styleguide

https://sizucca.github.io/pepagis/

## Install 手順

```sh
git clone git@github.com:sizucca/pepagis.git
git clone git@github.com:sizucca/pepabo.css-framework.git
```

`pepagis` 内で、必要な npm をインストール。
ここにコメントを追加してみる！
ここにコメントを追加してみる！

```sh
cd pepagis
npm install --save-dev gulp del gulp-sass gulp-plumber gulp-aigis browser-sync run-sequence

# ↑ は以下をまとめて install しているだけ
# npm install --save-dev gulp
# npm install --save-dev del
# npm install --save-dev gulp-sass
# npm install --save-dev gulp-plumber
# npm install --save-dev gulp-aigis
# npm install --save-dev browser-sync
# npm install --save-dev run-sequence
```

以下は、GitHub では不要。  
最新版でない GitHub Enterprise では、以下の方法もある、というメモ。

>  `gh-pages` ブランチを `pepagis/docs にチェックアウト。  
>  （こうする事で、自動コンパイルされたファイルをそのまま `docs` に コミットできるようになる）
>
>  ```sh
>  # 【注意】`git worktree` を使うには`git 2.7.0` 以降が必要。
>  # cd pepagis
>  git worktree add gh-pages gh-pages
>  ```
>  
>  以下のディレクトリに移動すると、ブランチが `master` から `gh-pages` に変わっていれば成功。
>  
>  ```sh
>  # 【注意】`docs` ディレクトリにある `.git` は絶対に消さない事！（`docs` ごと消すとかダメ、絶対）
>  # cd pepagis
>  cd docs
>  ```

`gulp` コマンドで、作業開始。

```sh
# cd pepagis
gulp
```

## 設定方法

＜あとで書く！＞

## 使い方

＜あとで書く！＞

gulp で監視しながら  
https://github.com/sizucca/pepabo.css-framework/tree/master/project_sho/stylesheets/scss/_application/objects/components  
この辺のコンポーネント触ると反映（といいつつ framework のファイル設計が全然不完全...）


