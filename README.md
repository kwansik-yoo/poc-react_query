<h1> React Query </h1>

<h2> Table Of Content </h2>   

- [1. Default Options](#1-default-options)
- [2. Query](#2-query)
  - [2.1. Status](#21-status)
  - [2.2. Keys](#22-keys)
  - [2.3. Functions](#23-functions)
- [3. Network mode](#3-network-mode)
  - [3.1. ```online```](#31-online)
  - [3.2. ```always```](#32-always)
  - [3.3. ```offlineFirst```](#33-offlinefirst)

## 1. Default Options

1. ```useQuery```, ```useInfiniteQuery``` 는 캐시 데이터를 Stale로 간주함.
    - ```staleTime``` 옵션을 통해 설정 가능    
2. Stale query 는 다음의 조건에 자동으로 refetch 된다.   
   1. 새로운 query 인스턴스가 mount 되었을 때
   2. window가 refocused 되었을 때
   3. network가 reconnected 되었을 때
   4. refetch internal 이 설정되어 있을 때
3. 예상치 않은 re-fetch가 발생할 수 있다.    
   1. ```refetchOnXXX``` 설정을 확인해보면 알 수 있다.    
   2. 또한, dev 모드에서는 devTool과 app간 focusing으로 인해 더 자주 발생할 수 있다.    
4. Query result는 ```inactive```로 라벨링되어 caching 될 수 있다.    
   1. useQuery, useInfiniteQuery등의 활성화된 인스턴스가 없거나, observer가 없는 경우   
   2. 기본적으로 5분 뒤 garbage collect 대상이 된다. ```cacheTime``` 설정으로 override     
5. Query는 기본적으로 3번 retry하며 delay는 exponential 이다.     
   1. ```retry```, ```retryDelay``` 설정으로 override   
6. Query results는 값 변경 감지를 위해 구조적으로 공유된다.     
   1. json compatible 값 이외에는 무조건 새로운 값으로 간주한다.    
   2. 대용량 응답 등의 상황인 경우 ```config.structuralSharing``` 설정으로 override   
   3. json compatible이 아닌 값의 비교를 ```config.isDataEqual``` 설정으로 추가할 수 있다.   
   4. 또는 ```config.structuralSharing``` 설정으로 override할 수 있다.   

## 2. Query    
### 2.1. Status    
1. status : ```Do we have any or not?```
   1. loading
   2. error
   3. success
2. fetchStatus : ```Is it running or not?```
   1. fetching
   2. paused
   3. idle

### 2.2. Keys    
1. query에 대한 식별값이다.     
2. hashing 되기 때문에 순서는 상관이 없다.     
3. queryFn의 파라미터라면, 키에 포함하는 것이 바람직하다.     
```typescript
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

### 2.3. Functions    
1. [QueryFunctionContext](https://tanstack.com/query/v4/docs/guides/query-functions#queryfunctioncontext) 를 활용할 수 있다.   
```typescript
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

## 3. Network mode    
- network 상태에 따라 ```Query```, ```Mutation```을 어떻게 동작할 것인지 정의한다.    

### 3.1. ```online```    
1. ```default``` 설정이다.    
2. 네트워크가 없어 fetch가 불가한 경우 ```state(loading, error, success)```와 ```fetchStatus(fetching, paused, idle)```가 함께 노출된다.     
3. 이때 loading spinner를 활용하는 경우 단순히 ```loading``` 으로만 체크하는 것은 충분하지 않을 수 있다.    
   - 맨처음 mount 될 때 네트워크가 없는 경우 ```loading(state)``` + ```paused(fetchStatus)``` 일 수 있기 때문이다.    
   - ❔ ```isFetching``` 으로 대체??     
4. query가 진행되는 도중 network가 유실되면, retry mechanism 은 중단되고, 다시 network가 잡히면 계속 실행된다.     
   - 이 행위는 ```refetchOnReconnect(default:true)``` 와 독립적이다. (쿼리를 다시 실행하는 것이 아니라, 계속 진행하는 것)       

### 3.2. ```always```   
1. network 상태와 관계없이 ```Query```와 ```Mutation```을 수행한다.    
2. 보통 ```AsyncStorage```나, ```Promise.resolve(5)```와 같이 네트워크 없이 수행 가능한 것에 대해 활용가능하다.    
3. 이때 query가 실패하면 retry를 하지 않고, 바로 실패처리된다.    
4. 이때 ```refetchOnReconnect```의 default 값은 ```false```이다.    

### 3.3. ```offlineFirst```    
1. 처음 한번 실행하고, retry를 멈춘다.    
2. ```PWA``` 또는 ```HTTP Caching``` 을 위해 유용할 수 있다.     
3. 보통 첫번째 실행 시 성공할 것이나, cache가 사라지는 등의 이유로 실패하면, ```online``` 모드처럼 동작한다.      


