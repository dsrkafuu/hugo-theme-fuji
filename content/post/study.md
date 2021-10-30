+++
title = "2.5 Years at DTU"
date = 2021-03-06
tags = ["journal", "view"]
+++

I have graduated from DTU with a MSc in Engineering. Here are some points that
worth mentioning.

<!--more-->

## Subject, Tool and Experiment

The most important thing I realised is that there is a huge difference between
tools and subjects. Most of the courses I took during bachelor should be
classified as subjects. For example, "power electronics in renewable energy"
and "distributed energy system and theory". Only some math courses in the
freshman year provide means to handle calculation in subject courses. Though I
was exposed to all kinds of "technologies", only one subject will be the
subject during work or PhD.

I started thinking about this distinction when choosing the topic of my
Bachelor thesis. The idea was to focus on a tool that can utilise my
"knowledge" about different energy "technologies". I did find a tool, which I
think should be called physical modelling. The subjects are thee kinds of
thermal engines and heat transfers. The thesis got me an award from the
university, and it is hosted in
[edxu96/StaticDESim](https://github.com/edxu96/StaticDESim).

At that time, [the MSc program focusing on energy system analysis at
DTU](https://sdb.dtu.dk/2018/35/695) caught my eyes. I had read a book for
energy system analysis [[introduction2021blok](#reference)] that time and loved
the idea. However, during the first year at DTU, I realised those subjects are
too broad. For example, [International Energy Agency
(IEA)](https://www.iea.org/) is the top institution in this field, and
publishes lots of data and analysis about country-level energy systems. There
is a very important concept called "scenario" that I never encountered before.
For example, there is a tool called
[TIMES](https://iea-etsap.org/index.php/etsap-tools/model-generators/times), in
which DTU participated. It seems to me that most of the energy system analysis
models are based on parameters from such "scenarios", because the spatial and
temporal scope is so broad that statistical models are not applicable. Such
models provide a convenient way for the public, politicians and "researchers"
to communicate, and contribute a lot, for example, to [Danish climate
policies](https://ens.dk/en/our-responsibilities/energy-climate-politics/danish-climate-policies).
There are multiple courses on such modelling, but statistics never play an
important role. The building of "scenarios" is too subjective. Besides, I don't
think I can find a job or build something new in such field, largely because I
am an outsider. Gradually, I lost interest. (There are other topics in energy
system analysis like life cycle analysis [[burkhardt2011life](#reference)] that
I don't want to talk about.)

Luckily, another focus of that major is optimisation. I took many courses,
though never go beyond the limit of MILP. In my mind, they focused too much on
algorithms, which are important, indeed, but boring. How to apply MILP to
practical problems [[williams2013model](#reference)] was never mentioned.
Besides, the area, decision making under uncertainty
[[conejo2010decision](#reference)], interests me and it requires statistics. So
I had to learn statistics from scratch. I did take course in probability in
Taiwan, but it was mainly about combinatorial analysis (see, for example,
chapter 1 of [first2014ross](#reference)) and a bit about Bayes' theorem. Now,
MILP and basic statistical models have been in my toolbox.

In summer 2019, I took my favourite course, stochastic simulation, (for which I
[worked as TA](https://edxu96.github.io/post/ta/) in summer 2020). I didn't
really understand the course until the teacher summarised it, in the last
lecture, as "computer experiments with mathematical models"
[[santner2018design](#reference)]. For example, discrete event simulation.
[[law2015simulation](#reference)] I begun to understand the importance of
scientific experiments. Also, to make friends with the teacher, I audited [the
stochastic processes course](http://www2.imm.dtu.dk/courses/02407/)
[[pinsky2010introduction](#reference)] in autumn 2019, which is the hardest
course I ever take. The benefit is that I has become familiar with other topics
in operations research. Overall, every aspects for mathematical and physical
simulation become no stranger to me.

In that autumn, I also became addicted to [the graph theory
course](https://kurser.dtu.dk/course/01227), and audited every lecture.
Furthermore, it played a dominant role in my master thesis and my part-time job
at Utiligize company. Such experiences contribute to
[edxu96/mgrid](https://github.com/edxu96/mgrid), and this subject, utility
networks, has become my focus since.

## Collaboration

The most important lesson I learnt in Denmark is collaboration. Every single
course more or less emphasises collaboration, even when individual assignments
are the only requirement. There were some collaborative courses during my
bachelor, but the first thing we did was to spit the task equally and finished
it on our own. Surprisingly, in Denmark, the usual way in terms of
collaboration is to do exercises/assignments together (real-time and
face-to-face), aka group work (see a
[post](https://int-studentblog.dtu.dk/Group-work-a-way-to-prepare-for-the-real-world)
in DTU International Student Blog), which I never see in China.

There are advantages and disadvantages. I really hate this group work stuff and
tried to avoid it during the first two years, because it is not how software
engineers work together and my oral English was too poor at that time. But this
way of study is deeply integrated, since it usually takes half of the course
time. Teachers and TAs will be present, answering questions. I regret not
taking the opportunity now, because to receive help from teachers and TAs can
largely improve the final grade. It's not sufficient to know everything from
lectures. Instead, after the lecture, I went back to my dorm, where I read
books and wrote code alone.

Another example, I used to love writing LaTeX using
[overleaf.com](https://www.overleaf.com/), and in one course, my teammates
decided to rely on [its real-time collaboration
feature](https://www.overleaf.com/learn/how-to/Sharing_a_project). I never
agreed with the idea and spent my time writing Julia code, in order to obtain
results our final assignment of that course. The writing was a disaster,
because this issue, [What if a collaborator makes changes I don't want to
keep?](https://www.overleaf.com/learn/how-to/What_if_a_collaborator_makes_changes_I_don't_want_to_keep%3F),
was never resolved. The worst scenario was that we could not compile the file
until main contents were pasted in another template. Then it occurred to me
that [version control](https://git-scm.com/) can be apply to writing as well,
so I stopped using [overleaf.com](https://www.overleaf.com/) afterwards.

A more suitable approach I can think of, which is also adopted by some teams,
is to have multiple short meetings followed by individual work. The biggest two
problems of group work are irregular interruptions from teammates and the mix
of formal and casual conversation. So at the time of group work, the classroom
is very noisy. Scheduled short meetings can be focused on formal conversation
and afford students multiple long periods of uninterrupted time.

In terms of code, I was never able to collaborate with others, because I never
saw anyone capable of basic code refactoring. In summer 2020, I managed to
follow the practice of [continuous
integration](https://docs.github.com/en/actions/guides/about-continuous-integration)
and [master GitHub issues](https://guides.github.com/features/issues/). It
always surprises me how much effort is required to reach this milestone, and
how much it helps after. I stuck to this practice when coding and writing for
my master thesis. 

## Schedule

To schedule day-to-day life and work is not trivial. I have never seen a
teacher or a working colleague who doesn't schedule their daily activities. I
started to reply heavily on timetables in the second semester, when the courses
I took were very hard. My plan was to pass all the courses, so I formulated &
adjusted my timetable accordingly everyday. Moreover, during the pandemic,
online meetings can be fully integrated in the timetable software.

In my experience, a good starting point is to separate any day into three
4-hour periods: morning, afternoon and night. A very, if not most, important
thing is to leave enough time for sleep and meals, because the daily schedule
must be sustainable. As discussed above, [GitHub
issues](https://guides.github.com/features/issues/) can facilitate
collaboration. It can also log to-do list and the study progress. What's next
can be easily found and prioritised.

## Self-Study

Self-study skills are always worth mentioning. To read is the most important
one, and it is the cornerstone of all the other skills. For example, I always
believe only a small portion of information is delivered in lectures or slides,
so I always read all the materials before lectures. Also, one can never write
until read some materials in the same domain. The last example has been
discussed before in [work as
TA](https://edxu96.github.io/post/ta/#hints-and-key-points). The only way to
understand some algorithm is to read its pseudo-code or description.

To admit one's reading limit is not easy. There are many milestones in terms of
levels in my mind. To read and understand textbooks is just the first step.
It's harder to read journal papers because of the inadequate editing and
different writing styles. The materials in the next level are news and
magazines, and I admit consulting dictionaries a lot. There are many words with
which I am not familiar. The highest level, I think, is to read novels. The
only novel in English I have ever dared to read is "The Little Prince".

Again, one can formulate reading lists using [GitHub
issues](https://guides.github.com/features/issues/). It also serves as an
outline in case some contents are needed in the future.

Before the pandemic, I always print books and gather printed papers to books
and it helps a lot. It takes a while to adjust text sizes sometimes, but there
are many advantages. To write directly on pages really enhance the reader's
concentration. Also, to transcribe formulas strengthen the reader's
visualisation memory. Gradually, I got used to reading long texts and became
able to read papers on screen, when the pandemic hit.

Another important skill is test (validation), which has been discussed in [work
as TA](https://edxu96.github.io/post/ta/#tests) as well. The last one I want to
mention is to pose questions. For example, I posted [a question about my
application of KKT
condition](https://or.stackexchange.com/questions/4159/simple-nonlinear-programming-using-convexity-analysis-and-kkt)
and received lots of valuable feedbacks. To write a well-defined question
requires effort, but reward with high-quality answers and an improvement in
writing.

## Reference

- Blok, K., & Nieuwlaar, E. (2021). Introduction to energy analysis. Routledge.
- Burkhardt III, J. J., Heath, G. A., & Turchi, C. S. (2011). Life cycle
  assessment of a parabolic trough concentrating solar power plant and the
  impacts of key design alternatives. Environmental science & technology,
  45(6), 2457-2464.
- Conejo, A. J., Carrión, M., & Morales, J. M. (2010). Decision making under
  uncertainty in electricity markets (Vol. 1). New York: Springer.
- Law, A. M. (2015). Simulation modeling and analysis. New York: McGraw-Hill.
- Ross, S. (2014). A first course in probability. Pearson.
- Ross, S. (2012). Simulation. Academic Press.
- Pinsky, M., & Karlin, S. (2010). An introduction to stochastic modeling.
  Academic press.
- Santner, T. J., Williams, B. J., Notz, W. I., & Williams, B. J. (2018). The
  design and analysis of computer experiments. New York: Springer.
- Williams, H. P. (2013). Model building in mathematical programming. John
  Wiley & Sons.
