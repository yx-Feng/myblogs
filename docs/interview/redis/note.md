### 1. 什么是Redis，Redis能做什么？数据类型？

Redis 是一种基于内存的数据库，对数据的读写操作都是在内存中完成，因此**读写速度非常快**，常用于**缓存，消息队列、分布式锁等场景**。

**数据类型**

String(字符串)、Hash(哈希)、 List (列表)、Set(集合)、Zset(有序集合)

Bitmaps（位图）、HyperLogLog（基数统计）、GEO（地理信息）、Stream（流）

- String 类型的应用场景：缓存对象、常规计数、分布式锁、共享 session 信息等。
- List 类型的应用场景：消息队列（但是有两个问题：1. 生产者需要自行实现全局唯一 ID；2. 不能以消费组形式消费数据）等。
- Hash 类型：缓存对象、购物车等。
- Set 类型：聚合计算（并集、交集、差集）场景，比如点赞、共同关注、抽奖活动等。
- Zset 类型：排序场景，比如排行榜、电话和姓名排序等。

**Redis 的 String 底层是怎么实现的？**

Redis 的 `String` 类型底层是通过 **SDS（Simple Dynamic String）** 实现的，不是普通 C 字符串。

SDS 结构中包含了 `len`（实际长度）和 `alloc`（已分配长度），不需要像 C 字符串一样用 `strlen`。

支持存储任意二进制数据，不止是文本。

追加字符串时会自动扩容。

### 2. 为什么用 Redis 作为 MySQL 的缓存？

主要是因为 **Redis**具备「高性能」和「高并发」两种特性。

- **高性能**：用户第一次访问 MySQL 中的某些数据，这个过程会比较慢，因为是从硬盘上读取的。将该用户访问的数据缓存在 Redis 中，这样下一次再访问这些数据的时候就可以直接从缓存中获取了，操作 Redis 缓存就是直接操作内存，所以速度相当快。

- **高并发**：Redis 每秒钟能够承受的请求是远远大于直接访问 MySQL 的。单台设备的 Redis 的 QPS（Query Per Second，每秒钟处理完请求的次数） 是 MySQL 的 10 倍。

### 3. Redis常见指令

- **字符串操作**：Redis的基础数据类型，用于存储简单的键值对。
  
  - 常用命令：`SET`、`GET`、`INCR`。
  - 例如：`SET key value`将值存储到指定键中，`INCR`用于整数递增。

- **哈希操作**：适合存储类似对象的结构，可以包含多个字段和值。
  
  - 常用命令：`HSET`、`HGET`、`HGETALL`。
  - 例如：`HSET user name "Alice"`存储用户对象的字段信息，`HGETALL`可以一次性获取所有字段。

- **列表操作**：双向链表，用于消息队列、任务列表等场景。
  
  - 常用命令：`LPUSH`、`RPUSH`、`LPOP`、`LRANGE`。
  - 例如：`LPUSH`从左插入元素，`LRANGE`可以获取列表范围。

- **集合操作**：无序集合，自动去重，适合快速判断成员关系。
  
  - 常用命令：`SADD`、`SREM`、`SMEMBERS`。
  - 例如：`SADD myset "apple"`添加元素，`SISMEMBER`可以判断元素是否在集合内。

- **有序集合操作**：有序集合，根据分数排序，可以实现排行榜等功能。
  
  - 常用命令：`ZADD`、`ZRANGE`、`ZREVRANGE`。
  - 例如：`ZADD leaderboard 100 "Alice"`用于添加带分数的元素，`ZRANGE`按分数排序获取元素。

### 4. redis持久化策略/Redis 如何实现数据不丢失

Redis 的读写操作都是在内存中，所以 Redis 性能才会高，但是当 Redis 重启后，内存中的数据就会丢失，为了保证内存中的数据不会丢失，Redis 实现了数据持久化的机制，这个机制会把数据存储到磁盘，这样在 Redis 重启就能够从磁盘中恢复原有的数据。

**①RDB (Redis DataBase Snapshot)**

快照持久化，在一定的时间间隔内，将Redis内存中的数据以二进制的形式保存到硬盘上。这个二进制文件就是一个快照。

=> 优点：占用空间小，适合做备份和灾难恢复。在系统重启时，RDB文件加载速度相对较快。

=> 缺点：由于是定时触发，如果Redis在生成RDB快照的间隔内崩溃，可能会丢失最近一次快照之后的数据

**②AOF (Append Only File)**

追加文件：Redis每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里。

=> 优点：数据安全性高，每一条写操作都被记录，最多只会丢失几毫秒的数据。

=> 缺点：由于每次写操作都需要被记录，故障恢复时，需要全量把日志都执行一遍，一旦 AOF 日志非常多，恢复速度就比较慢。

**③AOF与RDB混合**

Redis 4.0 新增的方式，集成了 AOF 和 RBD 的优点。

### 5. redis为什么快呢？Redis 是如何处理并发网络请求的？

**基于内存操作**：Redis 将所有数据存储在内存中，内存的读写速度通常远远高于磁盘。

**单线程模型**：Redis 使用一个主线程来处理所有的客户端请求。每个客户端请求（无论是读取、写入数据，还是执行其他操作）都由 Redis 主线程逐一处理。在请求到达时，Redis 会将请求放入一个队列，然后逐个从队列中取出并处理请求。避免了多线程环境下的线程切换、竞争等开销。

**非阻塞 I/O 多路复用**：允许服务器在单个线程内高效管理多个客户端连接，不需要为每个连接都创建一个线程，从而提升并发处理能力。

- 在传统阻塞 I/O 模型中，系统会阻塞在某个 I/O 操作（如读取数据）上，直到操作完成才会继续处理其他任务。在非阻塞 I/O 中，程序不会因为等待 I/O 操作完成而暂停，而是立即返回去检查下一个任务。非阻塞 I/O 可以让进程在没有数据时继续其他操作，避免了等待 I/O 完成而浪费的 CPU 资源。

- 多路复用是指通过一个机制同时监视多个 I/O 通道，检测出哪些通道处于“准备就绪”的状态并进行处理。

- 不管有多少请求（比如你说的 1w 个），Redis 会一次性从多个连接中挑出“就绪的请求”来处理。

**处理并发网络请求的核心**：**单线程 + IO 多路复用**

### 6. Redis分布式锁如何实现续期？

Redisson，它内置了自动续期的 Watchdog 机制。默认续期时间为 30s，每隔 10s 自动续期，直到 unlock() 被显式调用。

```
RLock lock = redissonClient.getLock("my_lock");
try {
    lock.lock();  // 默认 Watchdog 自动续期
    // 业务逻辑
} finally {
    lock.unlock();
}
```

### 7. Redis 在大流量并发场景起了什么样的作用？你用redis做了些什么

Redis 在高并发系统中，常被用于：

- 缓存加速：缓解数据库压力（缓存热点数据）。

- 限流 + 防刷：利用 Lua 脚本 + Redis 原子性，做请求限流。

- 分布式锁：利用 SETNX 实现互斥锁（加锁 + 设置过期时间）。

导航网站

- 使用redis缓存验证码。key为 `前缀captcha:codes: + uuid`，value是生成的验证码字符串。
- redis+Lua脚本实现对特定接口的限流。key为`自定义前缀（rate:limiter:）+类名+方法名+ IP/用户ID`，value为请求次数。

火车购票系统

- 分布式锁：解决车票超卖的问题
  
  - key：前缀LOCK_CONFIRM_ORDER - 日期 - 车次
  
  - value：用于标识持有锁的客户端
    
    ```
    lock = redissonClient.getLock(lockKey);
    boolean tryLock = lock.tryLock(0, TimeUnit.SECONDS);
    // 释放锁
    lock.unlock();
    ```

### 8. Redis 的 Lua 脚本原理

Redis 提供了对 Lua 脚本的支持，可以通过 `EVAL` 或 `EVALSHA` 命令执行 Lua 脚本。Lua 脚本的执行是在 Redis 服务器端进行的，因此具有原子性和高效性。

- Redis 在执行 Lua 脚本期间，其他命令不会被执行，直到当前脚本执行完毕。这保证了脚本执行中的操作不会被其他 Redis 客户端操作中断。
- 因为 Redis 本身是单线程的，所以即使是多个脚本的并发执行，Redis 也会逐个处理它们。

### 9. redis分布式锁原理，具体细节，可重入怎么实现

**加锁**

- 命令格式：`SET key value NX PX ttl`。
  
  - `NX`：表示“只有在键不存在时才执行操作”，保证加锁的原子性。
  - `PX ttl`：设置锁的自动过期时间，避免因客户端崩溃导致锁永久存在。
  - 锁的 `value` 通常是一个唯一标识（如 UUID），用于区分不同客户端持有的锁。只有持有该唯一标识的客户端才能释放锁，确保解锁的正确性。

- 如果 `SET` 返回成功，表示加锁成功；否则加锁失败（其他客户端已持有锁）。

**解锁**

- 客户端释放锁时，需确认自己持有锁（通过唯一标识 `value`），以避免误解锁其他客户端的锁。

**自动过期**：

- 设置锁的过期时间 (`ttl`) 是为了防止客户端崩溃后，锁无法被释放。
- 锁过期后，其他客户端可以重新获取

### 10. Redis作为缓存，会出现哪些问题，并讲讲解决方法

**① 缓存穿透**：客户端请求的数据在缓存和数据库中都不存在。

- 解决方法：
  
  - 缓存空结果：如果查询结果为空（如数据库中也不存在），将空结果（如 `null` 或特定值）存入缓存，并设置一个较短的过期时间。
  - 布隆过滤器：通过在缓存层之前拦截不存在的查询请求来解决。当请求访问某个 Key 时，首先通过布隆过滤器快速判断该 Key 是否存在于数据库中，若不存在则直接返回空值，避免穿透缓存层查询数据库；若存在，则继续查询缓存或数据库。（写入数据 -> 计算k个哈希值 -> 位数组对应位置置1，查询数据 -> 计算k个哈希值 -> 检查所有位是否为1 -> 全为1可能存在，有0确定不存在）

**② 缓存击穿**：指某个热点数据在缓存中失效的瞬间，大量并发请求同时访问该数据，导致大量请求涌向数据库。

- 解决办法：
  
  - 设置热点数据永不过期。
  
  - 使用互斥锁/分布式锁来确保只有一个请求能去加载数据并更新缓存，其余请求等待。

**③ 缓存雪崩**：指大量缓存同时失效，导致大量请求同时访问数据库，可能导致数据库崩溃。

- 解决办法：
  
  - 缓存过期时间随机化：在设置缓存过期时间时，添加一个随机值，避免所有缓存同时失效。
    
    ```
    redis.set(key, value, baseTTL + random.nextInt(maxOffset));
    ```
  
  - 使用限流措施控制访问数据库的请求数量，例如漏桶算法或令牌桶算法。

**④ 热点 Key 问题**：某些热点 Key 被频繁访问，可能导致 Redis 单节点压力过大，甚至出现性能瓶颈。

- 解决办法：
  
  - 分片缓存：将热点数据拆分成多个子 Key，分散到不同的 Redis 节点。例如：当用户请求自己的信息时，可以通过不同的子 `Key` 来访问各个部分的缓存，如通过 `user:1:info` 获取个人基本信息，`user:1:orders` 获取订单信息。不同的子 `Key` 可能存储在不同的 Redis 节点上，从而避免了单个节点的压力过大。
  
  - 多级缓存：本地缓存（如 Caffeine，通过优化淘汰策略优先保留高频 Key，对热点 Key 设置更长的过期时间等）存储热点 Key 的高频访问数据，，降低延迟。Redis 存储热点 Key 的完整数据，避免本地缓存容量不足。
  
  - 请求合并：通过批量处理或队列机制，将对同一 Key 的访问合并成一次请求。

**⑤ 缓存与数据库双写不一致**：由于 Redis 是内存数据库，数据会被频繁地缓存到 Redis 中以提高读取性能。当 MySQL 中的数据发生变化时，缓存的 Redis 数据可能没有及时更新，导致数据不一致。

- 解决办法：
  
  - 写时更新（Write-through cache）：当更新数据时，首先更新缓存，然后再更新数据库。这样可以保证缓存和数据库之间的一致性，但会导致写入延迟增加。
  
  - 延迟双删策略：在更新数据库前先删除缓存。更新数据库后再延迟删除缓存，确保一致性。

### 11. Redis 过期淘汰策略

Redis 的过期淘汰策略是指在**内存达到上限**时，如何处理存储的数据。它主要包括两方面：**过期键的删除机制**和**内存淘汰策略**。

**过期键的删除机制**

- 定期删除：Redis 每隔一定时间（默认 100ms）随机检查一部分设置了过期时间的键。如果发现这些键已经过期，就将其删除。

- 惰性删除：当访问一个键时，Redis 会检查该键是否已过期。如果键已过期，则在访问时才会被删除。

- 主动删除：当 Redis 的内存不足时，会主动尝试清理过期键来释放空间。

**内存淘汰策略**

- noeviction：默认策略。不淘汰任何键，直接拒绝写入新数据并返回错误。适合只读场景或不希望丢失数据的情况。

- allkeys-lru：淘汰所有键中最少使用的键（Least Recently Used, LRU）。适合缓存场景，确保最近访问的数据尽量保留。

- allkeys-random：随机淘汰所有键。

- allkeys-lfu：淘汰所有键中访问频率最低的键（Least Frequently Used, LFU）。

- volatile-lru：在设置了过期时间的键中，淘汰最少使用的键。如果没有设置过期时间的键，则拒绝写入。

- volatile-random：在设置了过期时间的键中，随机淘汰键。

- volatile-lfu：在设置了过期时间的键中，淘汰访问频率最低的键。

### 12. 如何优化锁误删的问题？

**锁误删问题**：指在分布式锁的实现中，由于某些原因（如网络延迟、业务逻辑异常等），一个客户端误删了其他客户端持有的锁，导致数据不一致或系统异常。

**举例**：

1. 客户端 A 获取了锁，锁的超时时间为 10 秒。

2. 客户端 A 执行业务逻辑，但由于网络延迟，释放锁的请求未及时到达锁服务。

3. 在客户端 A 的释放请求到达之前，锁因超时被自动释放。

4. 客户端 B 获取了锁。

5. 客户端 A 的释放请求到达锁服务，误删了客户端 B 持有的锁。

解决：

- 使用唯一标识：在获取锁时，为每个客户端生成一个唯一标识（如 UUID），并将其作为锁的值。释放锁时，先检查锁的值是否与当前客户端的标识匹配，只有匹配时才释放锁。
  
  ```
  # 获取锁
  lock_value = str(uuid.uuid4())
  if redis.set("my_lock", lock_value, nx=True, ex=10):
      try:
          # 执行业务逻辑
          ...
      finally:
          # 释放锁时检查标识
          if redis.get("my_lock") == lock_value:
              redis.delete("my_lock")
  ```

- 使用 Lua 脚本将获取锁和释放锁的操作原子化，避免误删。

- 使用成熟的分布式锁框架（如 Redisson、Zookeeper），这些框架已经处理了锁误删等问题。

### 13. 在锁误删场景中，如果线程成功获取到锁，但该线程的业务逻辑执行时间超过锁的超时时间，如何处理？

- 设置合理的超时时间

- 可以使用 **Watchdog 机制**（如 Redisson 的实现）自动续期。

### 14. 如果数据量是千万级，还适合用 redis 吗

Redis 是纯内存数据库，数据全量驻留内存。千万级数据可能导致内存溢出。

=> 使用 Redis 集群（Cluster）分片存储数据，每个节点存储部分数据。

=> 可以考虑使用 Redis 的内存淘汰策略来控制内存使用。

若数据访问稀疏，内存资源利用率低，可能不如使用磁盘存储（如 MySQL）经济。

### 15. redis 做集群还能保证排行榜的正确性吗

确保同一排行榜的所有数据集中在一个分片。

当数据必须分布在多个分片时（如数据量极大），需手动合并结果。

步骤：

1. 从每个分片获取局部 TOP N（如每个分片取前 100 名）。
2. 在应用层合并所有分片的结果，重新计算全局 TOP N。

### 16. DB和缓存一致性问题如何解决？

**问题**：线程 A 更新 DB 后未删缓存，线程 B 读取旧缓存，导致数据不一致。

**解决方案 - 延时双删**：

更新 DB 后立即删除缓存，等待一定时间（如 500ms）后再次删除缓存。

```
db.update(data);
cache.delete(key);
Thread.sleep(500); // 等待其他线程操作完成
cache.delete(key); // 二次删除确保缓存失效
```

假设两个线程同时更新同一数据：

- 线程 A：更新 DB → 删除缓存 → 此时缓存为空。
- 线程 B：读取缓存（未命中）→ 从 DB 读取旧值 → 写入缓存 → 此时缓存存储旧数据。

若线程 A 在删除缓存后立即进行二次删除，可能无法覆盖线程 B 写入的旧数据。**等待时间的作用**是让线程 B 有机会完成 “读取 DB→写入缓存” 的操作，从而确保二次删除能清除线程 B 写入的脏数据。
