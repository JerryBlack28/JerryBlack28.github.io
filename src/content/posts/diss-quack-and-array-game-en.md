---
title: diss_quack and Array Game (CF 2246 D)
published: 2026-07-18
description: Game theory + bitwise enumeration — enumerate how many global halving operations are performed to compute the minimum step count.
tags: [Algorithms, Game Theory, Bit Manipulation, Enumeration]
category: Algorithms
draft: false
lang: en
---

[Codeforces Round 1108 (Div. 2) D](https://codeforces.com/contest/2246/problem/D)

### Problem Summary

> You are given an array $a$ of length $n$ with $0 \leq a_i \leq 10^5$. Before the game starts, Alice may increment any single element any number of times, each increment counted as one step. Then Alice and Bob alternate turns, with Bob moving first. On Bob's turn he picks two positions and swaps them (possibly the same position). On Alice's turn: if $a_1$ is even, she picks the largest $j$ such that $a_i \bmod 2 = 0$ for all $i \leq j$, then divides every $a_i$ ($i \le j$) by $2$ — this counts as one step; otherwise she decreases $a_1$ by $1$, again one step. When any value becomes zero it is removed from the array. Bob wants to maximise Alice's total number of steps, Alice wants to minimise it. Output the minimum number of steps Alice performs.

### Approach

> First consider the version without the pre-game `+1` operations. If there is any odd number, Alice cannot perform the global halving move, so the answer is $\sum_{i=1}^{n} \bigl(\text{popcnt}(a_i) + \lfloor \log_2 a_i \rfloor + 1 - 1\bigr) = \sum_{i=1}^{n} \text{popcnt}(a_i) + |a_i| - 1$, where $|a_i|$ denotes the bit-length of $a_i$. If every number is even, Alice can keep halving globally until some value becomes odd, and after that the cost above still applies.
>
> This suggests fixing the number of global halvings we perform as $j$, then computing the minimum number of `+1` operations required to make every $a_i$ a multiple of $2^j$. A naive choice is $\text{step} = 2^j - (a_i \bmod 2^j)$, but that isn't always optimal — sometimes a few extra `+1`s can eliminate more $1$-bits from the binary representation. So we need to search a small window around $a_i$.
>
> How wide should the window be? Notice that $\text{popcnt}(a_i) + |a_i| - 1$ is bounded by $17 + 17 - 1 = 33$ for $a_i \le 10^5$. That means increasing $a_i$ by more than $33$ is never worthwhile — the extra `+1`s would already exceed the entire remaining cost. So for every element we only need to try the $33$ values immediately above $a_i$, keep those divisible by $2^j$, and pick the minimum. Total complexity: $O(n \log^2)$.

### Code

```cpp
#include<bits/stdc++.h>
using namespace std;

#define endl '\n'
#define fi first
#define se second
#define ll long long
#define lowbit(x) (x&(-x))
const int mod=998244353;
const double eps=1e-12;
const int inf=0x3f3f3f3f;
const ll INF=0x3f3f3f3f3f3f3f3f;
#define popcnt __builtin_popcount
int dcmp(double x){if(fabs(x)<eps)return 0;return x>0?1:-1;}

#define int ll

// mt19937 rnd(random_device{}());
// uniform_int_distribution<int>dist(0,1000000);

int a[100005];
int b[100005];
int jie[21];

int len(int x)
{
    int cnt=0;
    while(x)
    {
        cnt++;
        x>>=1;
    }
    return cnt;
}

void solve()
{
    int n;
    cin>>n;
    int ans=inf;
    for(int i=1;i<=n;i++)
    {
        cin>>a[i];
    }
    for(int j=0;j<=20;j++)
    {
        int res=j;
        for(int i=1;i<=n;i++)
        {
            int tmp=inf;
            for(int k=a[i];k<=a[i]+33;k++)
            {
                if(k%jie[j]==0)
                {
                    b[i]=k/jie[j];
                    tmp=min(tmp,k-a[i]+popcnt(b[i])+len(b[i])-1);
                }
            }
            b[i]=a[i]+jie[j]-a[i]%jie[j];
            tmp=min(tmp,b[i]-a[i]+popcnt(b[i]/jie[j])+len(b[i]/jie[j])-1);
            res+=tmp;
        }
        ans=min(ans,res);
    }
    cout<<ans<<'\n';
}

/*
 110
1000
  10
 100
   1
*/

#undef int

int main()
{
    ios::sync_with_stdio(false);cin.tie(nullptr);
    // cout<<fixed<<setprecision(10);

    jie[0]=1;
    for(int i=1;i<=20;i++)
    {
        jie[i]=jie[i-1]*2;
    }

    int _;cin>>_;while(_--)
    {
        solve();
    }
    return 0;
}
```
