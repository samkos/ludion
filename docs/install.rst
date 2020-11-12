Installation
============


Requirements
------------

*Ludion* does not require any super priviledge. It can be
installed by a regular user as long as he possess an AWS
account to install *Ludion* centralized services.

Distribution
------------

*Ludion* is an open-source project distributed under the BSD
2-Clause "Simplified" License which means that many possibilities are
offered to the end user including the fact to embed *Ludion* in
one own software.

Its stable production branch is available via github at
https://github.com/samkos/ludion where its latest production and
development branch can be found

The most recently updated  documentation can be browsed at
http://ludion.readthedocs.io.


Installing *Ludion* 
--------------------
*Ludion* is composed of:

- a centralized dashboard and a GraphQL interface, hosted on a set of
  AWS serverless Resources, deployed thanks to *AWS Amplify*
- a set of scripts executable in a Unix shell to be installed on the
  connected Resources to connect to this centralized dashboard.

Current source is available on  Github, use the following command to retrieve
the latest stable version from the repository::

    $ git clone git@github.com:samkos/ludion.git

and for the development version::

    $ git clone -b dev git@github.com:samkos/ludion.git


Installing *Ludion* Centralized Services
----------------------------------------

*Ludion* relies on the following serverless AWS Components:

- 4 *DynamoDB* databases
- *AWS SES* to send mails,
- *Cognito user pool* to handle authentication of users
  that wish to connect to the website.
- *AWS Amplify* to deploy the dashboard and its
  corresponding *GraphQL* interface via *AWS Appsync*

Based on a *Cloud Formation* script, *Ludion* should be
straightforward to deploy on AWS Cloud. We are still working on a
fully automated installation, learning at the same time how to master
*Cloud Formation* for this case.

We are presenting here a semi-automated installation using shell
scripts and some amplify command that can not be scripted yet.

Prerequisites
^^^^^^^^^^^^^

This installation supposes that the current user

- has created an account on AWS

and that he installed on a local machine

- the aws cli (based on python)
- a recent version of nodeJS
- aws amplify

Deployment of the Dashboard in AWS cloud:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Let's deploy a version of *Ludion* that we will tag **dev**. Here are reproduced
below the steps to install the centralized dashboard of *Ludion* built on
serverless AWS components. At this stage, this steps are either automated either
still manual. For the manual parts, accepting all the default choices is
only required.


1. Clone the latest stable version of *Ludion* from  Github:

   $ git clone git@github.com:samkos/ludion.git LUDION_DEV

2. Initialize the amplify environment

   $ cd LUDION_DEV/ludion
   
   $ sh ../install/amplify_init.sh dev

3. Add the GraphQL API, and link to an authentication via cognito user pool

   $ amplify add api

   365
   
   y
   
   amplify_schema/schema.graphql


   $ amplify add auth

4. push the environment to the cloud
   
   $ sh ../install/amplify_push.sh

5. create the website   

   $ amplify hosting add

   $ amplify publish

   
Installing *Ludion* local components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Executables are gathered in the *API/unix/* directory. Adding this
directory to *PATH* variable complete the installation of
*Ludion*,


