---
title: diss_quack and Array Game (CF 2246 D)
published: 2026-07-18
description: 博弈 + 位运算枚举，通过枚举全体除二的次数来计算最少步数。
tags: [算法, 博弈, 位运算, 枚举]
category: 算法
draft: false
---

[Codeforces Round 1108 (Div. 2) D](https://codeforces.com/contest/2246/problem/D)

### 题目大意

> 有一串长度为 $n$ 的数列 $a\ (0\leq a_i\leq 10^5)$，Alice 在游戏前可以对任意一个位置上的数进行任意次   的操作，每操作一次记为一步。游戏开始后 Alice 和 Bob 轮流操作，Bob 先手：选择两个位置并交换（可以选同一个位置）。Alice 后手：若 $a_1$ 为偶数，则选择最大的 $j$，使得 $a_i\pmod 2=0,\forall i\leq j$，并将 $a_i:=a_i/2,\forall i\le j$，记为一步；否则，将 $a_1:=a_1-1$，记为一步。如果有数变为零，则将该数从数组中移除。Bob 想让 Alice 的步数越多越好，Alice 想让自己的步数越少越好，问 Alice 最少步数是多少。

### 思路

> 先考虑没有 `+1` 操作的情形，若当前有奇数，则 Alice 无法进行 `/2` 的操作，因此答案为 $\sum_{i=1}^npopcnt(a_i)+|a_i|-1$。若当前没有偶数，则 Alice 可以一直进行全体 `/2` 的操作，一直到出现奇数，接下来所需要的操作数同上。因此，我们可以钦定需要做几次全体 `/2` 操作为 $j$，则需要计算将 $a_i$ 加成 $2^j$ 的倍数所需要的步数。一个想当然的做法是 $step=2^j-(a_i \pmod {2^j})$，这个当然没问题，但不一定是最优的，有时候多进行几次 `+1` 的操作可以使二进制里少去更多的 $1$，所以我们还需要遍历一个范围，而这个范围怎么求呢？我们再来看 $popcnt(a_i)+|a_i|-1$ 这个式子，对于每一个位置的最多操作数也就是 $17+17-1=33$。所以对于上述情况，我们只需要额外遍历 $33$ 个数，找到其中的 $2^j$ 的倍数，并在里面求最小步数即可，复杂度为 $O(n\log^2)$。

### 代码

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
