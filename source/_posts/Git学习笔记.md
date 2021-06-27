---
title: Git学习笔记
date: 2017-09-11 18:05:07
update: 2017-09-11 18:05:07
tags: [git,学习笔记]
categories: 搬砖那些事儿
copyright: true
top:
---

对近几天的Git学习做一个小结。

<!-- more -->

学完了[廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，对git的概念和基本操作有了更深的理解。对“版本控制”的概念也理解的更加深刻。


----------

# 几点感受 #

以下是我学习了git之后的一些感受：


- 成为了Linus Benedict Torvalds的一枚小迷妹（以前也是，现在妥妥的）。
- 世上没有后悔药？不存在的，git的版本回退完美的实现了这一点。
- 搞清楚了git和github的关系，后者只是拥有一个git远程仓库，可以通过git连接并实现相应操作。
- Git服务器可以轻松搭建，除了github，还有coding/gitee等网站提供git服务。
- 工作效率真的提升很快。。。


----------


# 干货 #

下面对学习中涉及到的git命令做分类总结，都是最常用的。

## git本地管理 ##

>git最基本的一些操作

git init：将某目录变成git可以管理的仓库（添加.git目录）

git commit -m "...":一次性提交多个文件（add进来的文件）

git add xxx.md:可以多次添加多个不同文件

git status:可以时刻掌握仓库当前的状态

git diff:显示具体修改的内容（与提交进去的文件相比）

git log：显示从最近到最远的提交日志，加上--pretty=oneline参数可以将每次提交信息压缩成一行,最前边的数字加字母是指每次commit的commit-id,是16进制的表示形式

.gitignore文件：包括git需要忽略提交的文件名，此文件也需要提交到git

## 版本回退 ##

>世界上是有后悔药的

git reset --hard HEAD^:回退到上个版本（上上个版本HEAD^^,上100个版本是HEAD~100。HEAD是指向当前版本的指针，因此可以通过调整HEAD来在历史版本间穿梭）

git reset --hard commmitid：在没有关闭上次回退时的命令窗口时，可以取消回退。commitid没必要写全，git可以自己去找

git reflog:可以显示每一次commit和回退的id号，如果命令窗口关闭，可以用此命令先找到commitid，然后用上个命令取消回退

git checkout -- file：撤销在工作区对file做的修改，包括撤销对file文件的删除

git reset HEAD file & git checkout -- file：对file的修改已被add到stage，用前者删除add到stage的修改，再用后者撤销工作区的修改

git reset --hard HEAD^ :已经将想撤销的修改添加到了版本库，但还未提交到远程库。用版本回退撤销修改

git rm file&git commit -m "delete file"：删除已添加到版本库的文件

git checkout:用版本库里的文件版本替换工作区的文件版本（一键还原）

## 远程库连接 ##

>连接远程库，进一步实现团队协作。


git remote:查看远程库信息，详细信息加上-v选项

git remote add origin git@github.com:Summyj/xxx.git：将本地git仓库与github远程库想关联,也可以是其它库，远程库默认名字是origin，也可以设为其它，比如github

git push -u origin xxx:把本地仓库指定分支·内容推送到远程，下次推送可以不用-u参数
因为第一次推送master分支时如果加上-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，所以在以后的推送或者拉取时就可以简化命令。

git clone git@github.com:xxx/xxx.git:从远程仓库克隆到本地，后边是地址

git remotr rm origin:删除本地库关联的origin远程库

## 分支创建管理 ##

>实现更安全便捷的版本控制。


git checkout -b xxx:git check命令加上-b参数表示创建并切换到xxx分支，此命令相当于两条命令：
- git branch xxx
- git checkout xxx

git branch:查看当前分支（列出所有分支，当前分支前边会标有*号）

git merge xxx:将指定分支xxx合并到当前分支,首先要切换到当前分支（不一定是master分支）

git branch -d xxx:删除某分支（合并后再删除）

git branch -D xxx:强行删除某个没有被合并的分支

git log --graph --pretty=oneline --abbrev-commit：用分支图展示各分支合并情况（或者直接git log --graph，但这将会显示所有历史合并图）

git merge --no-ff -m "..." xxx:禁用git合并时默认的fast-forward模式，生成新的commit加入分支信息。-m后的内容就是合并信息


## 工作现场存储 ##

>版本控制的freestyle.

git stash:将当前工作现场储藏起来，等以后恢复现场后继续工作

git stash list:查看储藏的工作现场

git stash apply:回复储藏的工作现场

git stash apply stash@{x}有多个stash时恢复指定的stash

git stash drop:恢复现场并删除stash list的内容，如果有多个stash,默认恢复的是最新的stash.


## 多人协作 ##

>小伙伴们的友情

git checkout -b xxx origin/xxx:刚从远程库克隆到本地时只有master分支，用此命令创建和远程分支对应的分支

git pull:多人协作时，远程分支比本地分支更新导致推送失败，用此命令从远程库抓取该分支最新的提交并和本地分支进行合并，合并有冲突需要手动解决

git branch --set-upstream xxx origin/xxx:git pull失败时需要创建本地分支和远程分支的关联

## 标签管理 ##

>更方便进行版本控制，与commit id相比更好记。相当于版本库的一个快照。


Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针。与HEAD指针相比，后者可以移动，但标签不能移动），所以，创建和删除标签都是瞬间完成的。

git tag xxx:打标签

git tag v0.3 646123:将commit id为646123的提交打上v0.3标签。这样可以解决忘记打标签的问题

git tag:查看所有标签（按字母排序，而并非时间）

git show tagname:查看标签信息（包括说明文字）

git tag -a v0.x -m "..." 615465:创建带有说明的标签，用-a指定标签名，-m指定说明文字

git tag -d xxx:删除指定标签（因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。）

git push origin tagname:推送标签到远程

git push origin --tags:一次性推送全部尚未推送到远程的本地标签

git tag -d tagname & git push origin :refs/tags/tagname:删除已推送到远程库的标签，先从本地删除，再从远程删除

