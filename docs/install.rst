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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Based on a *Cloud Formation* script,
*Ludion* should be straightforward to deploy on AWS Cloud.

*Ludion* relies on the following serverless AWS Components:

- 4 *DynamoDB* databases
- *AWS SES* to send mails,
- *Cognito user pool* to handle authentication of users
  that wish to connect to the website.
- *AWS Amplify* to deploy the dashboard and its
  corresponding *GraphQL* interface via *AWS Appsync*

To be completed soon.

.. Deployment of the Dashboard:

Installing *Ludion* local components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Executables are gathered in the *API/unix/* directory. Adding this
directory to *PATH* variable complete the installation of
*Ludion*,


