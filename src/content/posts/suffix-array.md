---
title: 后缀数组基础题套路赏析
published: 2022-08-23
description: 基于罗穗骞2009年国集论文，使用SAIS模板，整理后缀数组经典题型与解题套路。
tags: [算法, 后缀数组, 字符串]
category: 算法
draft: false
---

> 好久没写博客了，最近学了一下后缀数组，感觉收获颇丰，于是想写一篇博客纪念一下。特此申明一下，这里用的板子是YZH大佬的SAIS模板，然后小标题和题目用的是罗穗骞大佬2009年国集论文中的标题和例题，%%%。

## 单个字符串的相关问题

### 不可重叠最长重复子串

> 首先当然是对所有后缀进行排序，然后我们考虑二分答案，假设当前的长度是 $l$，那么我们可以把排好序的后缀分成几段，其中每一段的`lcp(height)`都是大于等于$l$的，于是我们记录一下每一段后缀中`rl(sa)`的最大值和最小值，如果最大值和最小值的差大于$l$，那么就说明有不重叠的重复子串，反之则不然，这样的做法是$O(n\log n)$的。当然，我们还可以有$O(n)$的做法，在尺取的同时，用单调队列维护一下`rl(sa)`的最大值和最小值，并且答案就是所有符合条件的`lcp(height)`的最大值。

#### [Musical Theme](http://poj.org/problem?id=1743)

[code](https://pastebin.com/7vCDYMSX)

### 可重叠的k次最长重复子串

> 首先可以用同上题的做法，二分答案$l$，对于`lcp(height)`大于等于$l$的每一段，看看是否长度超过$k$，同样，这个方法的复杂度是$O(n\log n)$的。但是我们可以发现，用尺取，每次取长度为$k$的一段，同样可以把复杂度优化到$O(n)$。

#### [Milk Patterns](http://poj.org/problem?id=3261)

[code](https://pastebin.com/4BmKckDM)

### 子串的个数

> 我们可以发现，对于后缀排序是$i$的后缀，以`rl[i](sa[i])`作为开头，并且以`lcp[i](height[i])`及其之前最为结尾的所有子串都会被重复计算，于是我们就不去记这一段对答案的贡献，于是我们所要求的答案就是$\displaystyle\sum_{i=1}^nn-rl[i]+1-lcp[i]$，显然这样的做法的复杂度是$O(n)$的。

#### [DISUBSTR - Distinct Substrings](https://www.spoj.com/problems/DISUBSTR/)

[code](https://pastebin.com/WZPwe5H7)

### 最长回文子串

> 我们考虑把一整个字符串复制一段并且翻转，接在原字符串的后面，中间用一个没出现过的字符连接，然后我们对这个新的字符串进行后缀排序，于是我们可以通过枚举中心节点来更新答案，其中中心节点需要根据长度的奇偶性来分类枚举，由于$ST$表预处理的复杂度是$O(n\log n)$的，所以这个做法的整体复杂度也是$O(n\log n)$的。当然，如果能够把$RMQ$的复杂度降为$O(1)$，那么就可以把整体复杂度降到$O(n)$，具体的话就是笛卡尔树＋$Tarjan$。

#### [Palindrome](https://acm.timus.ru/problem.aspx?space=1&num=1297)

[code](https://pastebin.com/xDD2xktW)

### 连续重复子串

> 通过观察可以发现，如果一个串的连续重复子串的长度为$l$，那么有串$s[1]$和$s[l+1]$的$lcp$等于$n-l$，所以就只需要枚举一下总长度的因子就行，然后$lcp$可以用$ST$表求得，这样做的复杂度是$O(n\log n)$的。当然还能进行优化，由于$RMQ$的一端是固定的，于是可以用一个数组$O(n)$处理，这样就可以把复杂度降到$O(n)$。

#### [Power Strings](http://poj.org/problem?id=2406)

[code](https://pastebin.com/Yx6ZTHhn)

### 重复次数最多的连续重复子串

> 我们考虑枚举长度$l$为重复周期，那么就可以发现$s[1],s[1+l],\cdots,s[1+x\times l]$一定会在一个连续重复子串中，于是对于$s[1+a\times l]$和$s[1+a\times l+l]$，他们的$lcp$就是最长能往后延伸的长度，如果$lcp$不能被$l$整除，就看看能否往前再延伸一小段距离使得当前的答案增加一，然后算一下复杂度是$\displaystyle O\left(\sum_{i=1}^n{n\over i}\right)$即$O(n\log n)$的。

#### [Maximum repetition substring](http://poj.org/problem?id=3693)

[code](https://pastebin.com/qEbUcPAX)

#### [REPEATS - Repeats](https://www.spoj.com/problems/REPEATS/)

[code](https://pastebin.com/wrWFSQn6)

## 两个字符串的相关问题

### 最长公共子串

> 我们考虑把两段用一个没出想过的字符连起来，把这个新的字符串进行后缀排序。可以发现，最长公共子串一定出现在相邻两串的$lcp$中，这样的复杂度是$O(n)$的。

#### [Long Long Message](http://poj.org/problem?id=2774)

[code](https://pastebin.com/4AJwWmjh)

#### [Freedom of Choice](https://acm.timus.ru/problem.aspx?space=1&num=1517)

[code](https://pastebin.com/Uqb1Lekx)

### 长度不小于k的公共子串的个数

> 我们先按之前的方法连接字符串并且进行后缀排序，然后对于两个位于不同串的后缀，他们对答案的贡献很好处理，但是有这么多后缀，于是考虑怎么优化。我们首先对于每一个串$B$的后缀，计算它与它之前出现过的串$A$的后缀对答案的贡献，然后对串$A$也是同样，同时我们可以用一个单调栈进行优化，这样的复杂度是$O(n)$的。

#### [Common Substrings](http://poj.org/problem?id=3415)

[code](https://pastebin.com/Z08tqH5b)

## 多个字符串的相关问题

### 出现在不小于k个字符串中的最长子串

> 我们先把所有串都连在一起，并且中间用没出现过的并且互不相同的字符相连，然后对新串进行后缀排序，然后同样我们可以二分长度$l$，对于`lcp`大于等于$l$的每一段，看是否出现在不少于$k$个串中，这样的复杂度是$O(n\log n)$的，当然可以参照之前的方法，用尺取＋单调队列把复杂度优化到$O(n)$。

#### [Life Forms](http://poj.org/problem?id=3294)

[code](https://pastebin.com/yyJu0ir0)

### 在每个串中都至少出现两次且不重叠的最长子串

> 先像之前那样构造新串并进行后缀排序，然后二分答案$l$，对于`lcp`大于等于$l$的每一段，记录在每个串中`rl`的最大值和最小值，并进行判断即可，这样的复杂度是$O(n\log n)$的。

#### [PHRASES - Relevant Phrases of Annihilation](https://www.spoj.com/problems/PHRASES/)

[code](https://pastebin.com/YWsAxG6D)

### 出现或反转后出现在每个字符串中的最长子串

> 把每个串都复制一遍并翻转然后用$2\times n$个没出现过的且互不相同的字符连接这些字符串，再把新串进行后缀排序，二分长度$l$，对于`lcp`大于等于$l$的每一段，看是否在每个串中都出现过，这样的复杂度同样也是$O(n\log n)$的。

#### [Substrings](http://poj.org/problem?id=1226)

[code](https://pastebin.com/GP2LEwDB)
