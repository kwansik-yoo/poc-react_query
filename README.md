# React Query   

## Default Options

1. ```useQuery```, ```useInfiniteQuery``` 는 캐시 데이터를 Stale로 간주함.
    - ```staleTime``` 옵션을 통해 설정 가능    
2. Stale query 는 다음의 조건에 자동으로 refetch 된다.   
   1. 새로운 query 인스턴스가 mount 되었을 때
   2. window가 refocused 되었을 때
   3. network가 reconnected 되었을 때
   4. refetch internal 이 설정되어 있을 때
3. 
