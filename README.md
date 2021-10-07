# community-engine

확장가능한 컨테이너 기반 커뮤니티 서비스 엔진

## 개요



## REST Api

`POST`, `GET`, `DELETE`, `PATCH`, `PUT`

### 구조

#### Session

#### Board, Article, Comment (READ, WRITE, DELETE, MODIFY)

```
POST /article {title, body, author, password, boardid, title}
  => article id
POST /comment {articleid, body, author, password, parent}
  => comment id
POST /upvote ? article id
POST /downvote ? article id

GET /boards
  => [{board id, board name, article count}]
GET /board ? boardid & page
  => [{article id, title, viewed, upvote, downvote, comment count, author}]
GET /article ? articleid
  => [{title, body, author, boardid, title, viewed, upvote, downvote, comment count}]
GET /comment ? articleid
  => [{body, author, parent}]
GET /comment ? comment id
  => {body, author, parent}
  
GET /article_u ? author
  => [{board id, article id, title, viewed, upvote, downvote, comment count}]
GET /comment_u ? author
  => [{article id, body, author, parent}]
  
GET /search/article/title ? board id & content
  => [{article id, title, viewed, upvote, downvote, comment count, author}]
GET /search/article/body ? board id & content & option
  => [{article id, title, viewed, upvote, downvote, comment count, author, snippet of matched}]
GET /search/comment ? board id & content & option
  => [{article id, body, author, snippet of matched}]
  
  option) empty or n: contains
          es: using elastic search
          fz: using fuzzy partial matching search (experimental)
          
DELETE /article ? article id & password
  => ACK, NAK
DELETE /comment ? comment id & password
  => ACK, NAK
  
PATCH /article ? article id & password
  => ACK, NAK
(Comment will be immutable) PATCH /comment ? comment id & password
  => ACK, NAK
```

### 설계

#### POST

##### /article, /comment

```
1. 사용자로부터 Article(제목/본문/작성자/게시판Id)를 입력받는다.
2. 새로운 Article Id를 부여받기위해 예약한다.
 (Article Id 관리 Redis 사용)
 2-1. Redis 예약 Lock
 2-2. 가장 최근 Article Id 조회 후 다음 Id 예약
 2-3. Redis 예약 Unlock
3. Article를 DB에 작성한다.
 (Article 작성엔 MongoDB를 사용한다.)
4. 새로운 Article Id를 등록한다.
 (새로운 Article Id는 Redis에 등록한다)
5. POST MQ 작업을 수행한다.
 (Mysql와 ElasticSearch를 사용한다.)
 5-1. POST App에서 도착한 Article 정보를 Local Buffer에 저장한다.
 5-2. Local Buffer의 Article 정보를 Mysql, ElasticSearch에 입력한다.
```

#### GET

##### /boards

```
0. /boards는 board의 리스트를 가져오는 api이다.
1. redis에 저장된 boards 리스트를 가져온다.
```

##### /board

```
0. /board는 특정 board에 저장된 article들의 헤더를 가져오는 api이다.
1. redis를 이용하여 특정 게시판에 가장 최근에 삽입된 article의 리스트를 가져온다.
  1-1. 요청 page가 캐싱되어있지 않다면,
  1-2. 요청 board가 캐싱되어있지 않다면,
```

##### /article

```
0. /article은 특정 게시글의 본문을 가져오는 api이다.
1. mongodb의 인덱스 조회를 통해 본문을 가져온다.
  1-1. mongodb에 데이터가 없다면, mysql를 참조한다.
```

### 구현

### 테스트
