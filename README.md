# community-engine

## REST Api

`POST`, `GET`, `DELETE`, `PATCH`, `PUT`

### 구조

```
POST /article
{title, body, author, boardid}
  => article id
POST /comment
{articleid, body, author, parent}
  => comment id

```

## 구현

### POST

#### /article, /comment

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
 (Mysql을 사용한다.)
 5-1. POST App에서 도착한 Article 정보를 Local Buffer에 저장한다.
 5-2. Local Buffer의 Article 정보를 Mysql에 입력한다.
```
