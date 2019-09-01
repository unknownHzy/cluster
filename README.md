# Node.js Server Clustering

An easy example about how does Node.js clustering works.
# cluster
https://www.freecodecamp.org/news/how-to-scale-your-node-js-server-using-clustering-c8d43c656e8f/


0. 进程，线程，cpu，多核，以及他们之间的关系
1. 什么是cluster， 它是干嘛的？有什么作用？有什么弊端
2. 如何实现一个cluster

一个线程是计算机基本的执行单元，线程被OS编排，在CPU中执行。进程是线程的容器，一个进程内包含多个线程。
Threads running on the same core are not technically parallel. They only appear to be executed in parallel, as the CPU switches between them very fast (for us, humans). This switch is what is called context switch. Now, threads executing on different cores are executed in parallel. Most modern CPUs have a number of cores, however, most modern OSes (windows, linux and friends) usually execute much larger number of threads, which still causes context switches. Even if no user program is executed, still OS itself performs context switches for maintanance work.
多个线程运行在同一个核中不是技术上的并行，只能说看上去是并行，实际上是并发，因为CPU在线程之间切换很快，就说说一会执行这个线程，一会执行那个线程，你看上去是在一起执行，但是单核CPU只会在某个时间点执行某一个确定的线程，不会同时执行两个。
线程切换这个动作叫做上下文切换。
现在，多个线程执行在多核才是并行。大多数现在的CPU有多个内核，然而，大多数现代的操作系统通常操作更大量的线程（远远超过CPU内核个数，线程数>>CPU核数意味OS本身也需要进行线程的上下文切换）来完成自身的任务工作还不包括用户运行的程序，

为什么需要cluster：
NodeJs，node是单线程的。为了利用计算机的多核，需要用到Cluster module

参考文章：
1.如何用cluster扩展node服务：
https://www.freecodecamp.org/news/how-to-scale-your-node-js-server-using-clustering-c8d43c656e8f/
