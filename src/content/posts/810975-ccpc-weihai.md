---
title: 810975 (2021 CCPC 威海 M)
published: 2022-03-05
description: 容斥 + 组合数，求给定连赢长度约束下的比赛情况数。
tags: [算法, 组合数学, 容斥]
category: 算法
draft: false
---

[传送门](https://codeforces.com/gym/103428/problem/M)

### 题目大意

> 你玩了$n$把游戏，其中赢了$m$把，然后最长的连赢长度为$k$，问有多少种情况。$(0\leq n,m,k\leq10^5)$

### 思路

> 这道题一开始想的时候还以为是一道普普通通的排列组合题，但是发现并不能很好的分析清楚。看了$Solemntee$大佬的[题解](https://blog.csdn.net/solemntee/article/details/121686258)后才发现原来可以用容斥做。我们可以设$ans_k$为最长连赢次数大于等于$k$的情况，然后我们所要求的答案就是$ans_k-ans_{k+1}$。然后我们来分析一下$ans_k$怎么求。我们首先可以先把赢的情况挖空，然后有$i$次连赢次数大于等于$k$的情况就是$\binom{n-m+1}{i}$，然后我们剩下的位置就可以随便放了，情况就是$\binom{n-ik}{n-m}$，于是$ans_k$的结果就是$\sum_{i=1}^{ik<=m}(-1)^{i+1}\binom{n-m+1}{i}\binom{n-ik}{n-m}$，然后差不多就结束了，不过还得特判一下$k==0$的情况，然后就可以$AC$啦！

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
long long mod=998244353;
int MAX=100005;
vector<long long>fac,inv,finv;
void binom_init()
{
    fac.resize(MAX);
    finv.resize(MAX);
    inv.resize(MAX);
    fac[0] = fac[1] = 1;
    inv[1] = 1;
    finv[0] = finv[1] = 1;
    for (int i = 2; i < MAX; i++)
    {
        fac[i] = fac[i - 1] * i % mod;
        inv[i] = mod - mod / i * inv[mod % i] % mod;
        finv[i] = finv[i - 1] * inv[i] % mod;
    }
}
long long binom(long long n, long long r)
{
    if (n < r || n < 0 || r < 0) return 0;
    return fac[n] * finv[r] % mod * finv[n - r] % mod;
}
int main()
{
    binom_init();
    int n,m,k;
    scanf("%d%d%d",&n,&m,&k);
    if(k==0)
    {
        printf("%d\n",m==0);
        return 0;
    }
    long long ans1=0,ans2=0;
    for(long long i=1;i*k<=m;i++)
    {
        if(i&1)ans1=(ans1+binom(n-m+1,i)%mod*binom(n-i*k,n-m)%mod+mod)%mod;
        else ans1=(ans1-binom(n-m+1,i)%mod*binom(n-i*k,n-m)%mod+mod)%mod;
    }
    for(long long i=1;i*(k+1)<=m;i++)
    {
        if(i&1)ans2=(ans2+binom(n-m+1,i)%mod*binom(n-i*(k+1),n-m)%mod+mod)%mod;
        else ans2=(ans2-binom(n-m+1,i)%mod*binom(n-i*(k+1),n-m)%mod+mod)%mod;
    }
    printf("%lld\n",(ans1-ans2+mod)%mod);
    return 0;
}
```
