# Pell's Equation Solver

Find the first # of smallest positive integer pairs $(x, y)$ that satisfy Pell's equation: $x^2 - ny^2 = 1$. Try it out [here](https://sbplat.github.io/pell/)!

## How does it work?

The hardest part of this problem is finding the primitive solution (not the trivial one). Luckily, there is an algorithm known as the [Chakravala method](https://en.wikipedia.org/wiki/Chakravala_method) that can be used to find the primitive solution to Pell's equation.

Once we've found the primitive solution, we can generate all the other solutions really easily (in $O(1)$ time!).
Notice that given a solution $(x_i, y_i)$, we have
$$x_{i+1}+\sqrt{n}y_{i+1}=(x_{i}+\sqrt{n}y_{i})(x_0+\sqrt{n}y_0)$$
where $(x_0, y_0)$ is the primitive solution and $(x_{i+1}, y_{i+1})$ is the next solution. This can be proven by induction. Now, by comparing the coefficients of $1$ and $\sqrt{n}$, we get the following recurrence relations:
```math
\begin{align*}
    x_{i+1} &= x_0x_{i} + n y_0y_{i}\\
    y_{i+1} &= x_0y_{i} + y_0x_{i}
\end{align*}
```
We can use this to generate any finite number of solutions to Pell's equation.

## Why can't $n$ be a perfect square?

Assume $x\neq 1$ and $y\neq 0$ since this is a trivial solution.
Let's also assume $n$ is a perfect square, so $n = k^2$ for some positive integer $k$. We can rewrite Pell's equation as
$$x^2 - k^2y^2 = 1\implies x^2 - (ky)^2 = 1$$
It's easy to see that the only solution to this is $x = 1$ and $ky = 0$. But this contradicts our first assumption that $x\neq 1$ and $y\neq 0$, so $n$ cannot be a perfect square.

## How do I run this from source?

1. First, clone the repository and change into the directory:
```sh
git clone https://github.com/sbplat/pell.git
cd pell
```
2. Open `index.html` with your browser.
