---
title: Interval（20年牛客多校5）
published: 2023-05-04
description: 主席树 + 线段树维护区间与操作，处理强制在线的区间子集大小查询。
tags: [算法, 主席树, 线段树, 字符串]
category: 算法
draft: false
---

[传送门](https://ac.nowcoder.com/acm/contest/55996/H)

## 题意

有一个数列 $A(0\leqslant A_i\lt2^{30})$ 长度为 $N(1\leqslant N\leqslant10^5)$，

$F(l,r):=A_l\&A_{l+1}\&\cdots\&A_r$，

$S(l,r):=\left\{F(a,b)|\min(l,r)\leqslant a\leqslant b\leqslant\max(l,r)\right\}$，

有 $Q(1\leqslant Q\leqslant10^5)$ 组询问，对于给定的 $L,R(1\leqslant L',R'\leqslant N)$，求 $S(L,R)$ 的大小，强制在线。

## 思路

考虑到固定一个右端点，左端点向左拓展的时候，$F(l,r)$ 的个数不会很多，最多只有 $\log$ 个，于是我们就可以用二分预处理出所有的值。由于需要保留上一个版本的答案，所以我们需要拿一颗主席树来维护，第 $i$ 个版本的线段树中第 $j$ 个位置记录的是 $F(j,i)$ 是否对答案有贡献，这样就涉及了去重的这个问题。一个常见的技巧是对于一个值，只记录离第 $i$ 个位置最近的那个位置，并将之前的位置删去，这样就可以保证一个值只被算一次了，所以这道题就被转换成了主席树上单点修改，区间查询。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;

#define ll long long
#define fi first
#define se second
const double eps=1e-12;
const int inf=0x3f3f3f3f;
const ll INF=0x3f3f3f3f3f3f3f3f;
const double pi=acos(-1.0);
int dcmp(double x){if(fabs(x)<eps)return 0;return x>0?1:-1;}

#define int ll

struct president_segment_tree
{
    int cnt=0;
    int root[100005];
    struct node
    {
        int l,r,sum;
    }z[100005*600];
    int clone(int x)
    {
        cnt++;z[cnt]=z[x];
        return cnt;
    }
    void update(int id1,int &id2,int l,int r,int x,int w)
    {
        id2=clone(id1);
        z[id2].sum+=w;
        if(l==r)return;
        else
        {
            int mid=(l+r)>>1;
            if(x<=mid)update(z[id1].l,z[id2].l,l,mid,x,w);
            else update(z[id1].r,z[id2].r,mid+1,r,x,w);
        }
    }
    int query(int id,int l,int r,int x,int y)
    {
        if(x<=l&&r<=y)return z[id].sum;
        else
        {
            int mid=(l+r)>>1;
            int ans=0;
            if(x<=mid)ans+=query(z[id].l,l,mid,x,y);
            if(mid<y)ans+=query(z[id].r,mid+1,r,x,y);
            return ans;
        }
    }
}pst;
int a[100005];
struct segment_tree
{
    int tree[100005<<2];
    void build(int p,int l,int r)
    {
        if(l==r)tree[p]=a[l];
        else
        {
            int mid=(l+r)>>1;
            build(p<<1,l,mid);
            build(p<<1|1,mid+1,r);
            tree[p]=tree[p<<1]&tree[p<<1|1];
        }
    }
    int query(int p,int l,int r,int x,int y)
    {
        if(x<=l&&r<=y)return tree[p];
        else
        {
            int mid=(l+r)>>1;
            int ans=(1<<30)-1;
            if(x<=mid)ans&=query(p<<1,l,mid,x,y);
            if(mid<y)ans&=query(p<<1|1,mid+1,r,x,y);
            return ans;
        }
    }
}st;
map<int,int>last;

void solve()
{
    int n;
    cin>>n;
    for(int i=1;i<=n;i++)cin>>a[i];
    st.build(1,1,n);
    for(int i=1;i<=n;i++)
    {
        pst.root[i]=pst.root[i-1];
        if(last.count(a[i]))
            pst.update(pst.root[i],pst.root[i],1,n,last[a[i]],-1);
        last[a[i]]=i;
        pst.update(pst.root[i],pst.root[i],1,n,last[a[i]],1);
        int cur=a[i];
        while(true)
        {
            int l=0,r=i,res=0;
            while(l<r)
            {
                int mid=(l+r+1)>>1;
                int now=st.query(1,1,n,mid,i);
                if(now<cur)l=mid,res=mid;
                else r=mid-1;
            }
            if(!res)break;
            cur=st.query(1,1,n,res,i);
            if(last.count(cur))
                pst.update(pst.root[i],pst.root[i],1,n,last[cur],-1);
            last[cur]=res;
            pst.update(pst.root[i],pst.root[i],1,n,last[cur],1);
        }
    }
    int q;
    cin>>q;
    int lastans=0;
    while(q--)
    {
        int l,r;
        cin>>l>>r;
        l=(l^lastans)%n+1;
        r=(r^lastans)%n+1;
        if(l>r)swap(l,r);
        cout<<(lastans=pst.query(pst.root[r],1,n,l,n))<<'\n';
    }
}

#undef int

int main()
{
    ios::sync_with_stdio(false);cin.tie(nullptr);
    {
        solve();
    }
    return 0;
}
```
