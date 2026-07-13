---
title: Classic Problems on Suffix Arrays
published: 2022-08-23
description: Working through the canonical suffix-array problems from Luo Suiqian's 2009 IOI national team paper, using the SAIS template.
tags: [Algorithms, Suffix Array, Strings]
category: Algorithms
draft: false
lang: en
---

> It's been a while since I last wrote a post. I recently spent some time on suffix arrays and learned a lot, so I wanted to write this up as a keepsake. Credit where it's due — the template used below is YZH's SAIS implementation, and the section titles and example problems come from Luo Suiqian's 2009 IOI national team paper. Respect.

## Problems on a Single String

### Longest Non-Overlapping Repeated Substring

> Sort all suffixes, then binary-search the answer. For a candidate length $l$, group the sorted suffixes so that every group has `lcp(height)` at least $l$. Within each group, track the maximum and minimum of `rl(sa)`; if their difference exceeds $l$, a non-overlapping repeated substring of length $l$ exists. This is $O(n \log n)$. You can also do it in $O(n)$ by using two pointers together with a monotonic deque to maintain the max/min of `rl(sa)`; the answer is the largest `lcp(height)` seen across valid groups.

#### [Musical Theme](http://poj.org/problem?id=1743)

[code](https://pastebin.com/7vCDYMSX)

### Longest Repeated Substring Occurring at Least $k$ Times (Overlapping Allowed)

> The same binary-search-on-$l$ approach works: check whether some group with `lcp(height) >= l` contains at least $k$ suffixes. That's $O(n \log n)$. It also runs in $O(n)$ with two pointers by sliding a window of exactly $k$ consecutive suffixes.

#### [Milk Patterns](http://poj.org/problem?id=3261)

[code](https://pastebin.com/4BmKckDM)

### Number of Distinct Substrings

> Notice that for the suffix ranked $i$-th, all substrings starting at `rl[i]` and ending at or before `lcp[i]` characters into the suffix would be double-counted. Subtracting those out, the answer is
> $$\sum_{i=1}^{n} \bigl(n - rl[i] + 1 - lcp[i]\bigr),$$
> computable in $O(n)$.

#### [DISUBSTR - Distinct Substrings](https://www.spoj.com/problems/DISUBSTR/)

[code](https://pastebin.com/WZPwe5H7)

### Longest Palindromic Substring

> Reverse the string, concatenate it to the original with an unused separator in the middle, then run suffix array on the combined string. Enumerate center points (splitting into odd/even-length cases) and combine with $ST$-table range-min on the height array. Precomputation is $O(n \log n)$; querying is $O(1)$, so total $O(n \log n)$. If you replace the $ST$ table with Cartesian tree + Tarjan for $O(1)$ RMQ with $O(n)$ preprocessing, the whole solution becomes $O(n)$.

#### [Palindrome](https://acm.timus.ru/problem.aspx?space=1&num=1297)

[code](https://pastebin.com/xDD2xktW)

### Continuous Repetition Detection

> Observation: if a string is the concatenation of $k$ copies of a period of length $l$, then $lcp(s[1], s[l+1]) = n - l$. Enumerate the divisors of $n$ and use the $ST$-table to check the $lcp$; that's $O(n \log n)$. If you notice that one endpoint of the RMQ is always fixed, you can precompute in $O(n)$ and drop the $\log$.

#### [Power Strings](http://poj.org/problem?id=2406)

[code](https://pastebin.com/Yx6ZTHhn)

### Substring with Maximum Number of Continuous Repetitions

> Enumerate period length $l$. For any candidate period, positions $s[1], s[1+l], \dots, s[1+xl]$ must fall inside a run of length-$l$ repeats. For adjacent samples $s[1 + al]$ and $s[1 + al + l]$, their $lcp$ gives the maximum stretch to the right; if $lcp$ isn't a multiple of $l$, check whether pushing the start one step to the left adds one more copy. The complexity works out to
> $$O\!\left(\sum_{i=1}^{n} \frac{n}{i}\right) = O(n \log n).$$

#### [Maximum repetition substring](http://poj.org/problem?id=3693)

[code](https://pastebin.com/qEbUcPAX)

#### [REPEATS - Repeats](https://www.spoj.com/problems/REPEATS/)

[code](https://pastebin.com/wrWFSQn6)

## Problems on Two Strings

### Longest Common Substring

> Concatenate the two strings with an unused separator, then run suffix array on the combined string. The longest common substring must appear as the $lcp$ of two adjacent suffixes that come from different original strings. $O(n)$.

#### [Long Long Message](http://poj.org/problem?id=2774)

[code](https://pastebin.com/4AJwWmjh)

#### [Freedom of Choice](https://acm.timus.ru/problem.aspx?space=1&num=1517)

[code](https://pastebin.com/Uqb1Lekx)

### Count of Common Substrings of Length at Least $k$

> Concatenate as above and run suffix array. For each suffix of $B$, count contributions from previously seen suffixes of $A$, then swap roles and do the same. A monotonic stack keeps the running sum in $O(1)$ amortized per suffix, giving $O(n)$ overall.

#### [Common Substrings](http://poj.org/problem?id=3415)

[code](https://pastebin.com/Z08tqH5b)

## Problems on Multiple Strings

### Longest Substring Appearing in at Least $k$ Strings

> Concatenate all strings using $k$ *distinct* unused separators, then run suffix array. Binary-search the length $l$: for each contiguous group with `lcp >= l`, check whether the group spans at least $k$ different source strings. $O(n \log n)$. As before, two pointers + a monotonic deque bring this down to $O(n)$.

#### [Life Forms](http://poj.org/problem?id=3294)

[code](https://pastebin.com/yyJu0ir0)

### Longest Substring Appearing at Least Twice Non-Overlapping in Every String

> Same concatenation trick, then binary-search $l$. For each `lcp >= l` group, per source string track the max and min `rl` and check that every string has two occurrences that don't overlap. $O(n \log n)$.

#### [PHRASES - Relevant Phrases of Annihilation](https://www.spoj.com/problems/PHRASES/)

[code](https://pastebin.com/YWsAxG6D)

### Longest Substring Appearing (or Reverse-Appearing) in Every String

> For every string, append its reverse and use $2n$ distinct unused separators between the pieces. Run suffix array on the combined string, then binary-search $l$ and check whether each group covers every original string. Also $O(n \log n)$.

#### [Substrings](http://poj.org/problem?id=1226)

[code](https://pastebin.com/GP2LEwDB)
