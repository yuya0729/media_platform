# media_platform
note, qiita系のやつ

## 使うやつ
- express
- postgres
- sequelize
- 後々docker

## URIの構成
|メソッド|パスとクエリ|view|処理内容
|:--|:--|:--|:--
|GET|/register|register|アカウント登録画面
|GET|/login|login|ログイン画面
|POST|/notes|-|登録、ログイン後のpost先
|GET|/notes|index|投稿一覧
|GET|/notes/add/new|newPost|投稿ページ
|POST|/notes/create|-|投稿
|GET|/notes/:id([0-9]+|show|記事の詳細
|GET|/notes/:id/edit|edit|編集ページ
|PUT|/notes/:id|-|編集
|POST|/notes/delete/:id([0-9]+)|-|削除
|GET|/logout|-|ログアウト

## モジュール設計
|ファイルパス|モジュールの役割
|:--|:--
|app.js|HTTP サーバーを起動する
|router/router.js|リクエストを処理を行うハンドラに振り分ける
|lib/posts-handler.js|/posts のリクエストメソッドを処理する
|lib/handler-utils.js|その他のリクエストを処理する
|lib/post.js|投稿を追加、取得、削除する
