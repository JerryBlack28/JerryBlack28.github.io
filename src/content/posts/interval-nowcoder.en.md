---
title: Interval (2020 Nowcoder Multi-School #5)
published: 2023-05-04
description: Persistent segment tree + segment tree for range AND set-size queries with forced online mode.
tags: [Algorithms, Persistent Segment Tree, Segment Tree, Strings]
category: Algorithms
draft: false
lang: en
---

[Problem link](https://ac.nowcoder.com/acm/contest/55996/H)

## Problem

You are given an array $A$ of length $N$ with $0 \le A_i < 2^{30}$ and $1 \le N \le 10^5$.

Define $F(l, r) := A_l \,\&\, A_{l+1} \,\&\, \cdots \,\&\, A_r$ (bitwise AND over the range).

Define $S(l, r) := \{\, F(a, b) \mid \min(l, r) \le a \le b \le \max(l, r) \,\}$.

There are $Q$ queries with $1 \le Q \le 10^5$. For each query $(L, R)$ with $1 \le L, R \le N$, output $|S(L, R)|$ — the number of distinct values that appear as an AND of any subarray inside $[L, R]$. Queries are forced-online.

## Approach

Fix the right endpoint and slide the left endpoint leftward. Because a bitwise AND only ever loses bits, $F(l, r)$ takes at most $O(\log V)$ distinct values, and each transition can be found via binary search on a segment tree that supports range AND.

Since queries are online, we need every historical state, so we maintain a **persistent segment tree**: version $i$'s tree records, at position $j$, whether $F(j, i)$ contributes to the answer. Deduplication uses a classic trick — for each value only keep the *latest* position that produces it, deleting the previous occurrence. This ensures each distinct AND value is counted exactly once.

The problem then reduces to: point update, range sum query on the persistent segment tree.

## Code

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
