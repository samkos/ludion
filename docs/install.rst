Installation
============


Requirements
------------

*Ludion* should work with any cluster/supercomputer or any resource based on Unix operating system which has Python installed and can reach AWS resources.
dependency on numpy will be imposed.

Distribution
------------

*Ludion* is an open-source project distributed under the BSD
2-Clause "Simplified" License which means that many possibilities are
offered to the end user including the fact to embed *Ludion* in
one own software.

Its stable production branch is available via github at
https://github.com/KAUST-KSL/ludion, but its latest production and
development branch can be found at https://github.com/samkos/ludion

most up todate documentation about *Ludion* can be browsed at
http://ludion.readthedocs.io.


Installing *Ludion* 
--------------------
*Ludion* is composed of:
- a centralized dashboard, hosted on a set of AWS serverless Resources,
  deployed thanks to AWS Amplify
- a few executables to be installed on the connected Resources to
  connect to this centralized dashboard.

Installing *Ludion* Centralized Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To be added

.. Deployment of the Dashboard:

Installing *Ludion* local components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


.. _install-source:

Source
------

Current source is available on  Github, use the following command to retrieve
the latest stable version from the repository::

    $ git clone git@github.com:samkos/ludion.git

and for the development version::

    $ git clone -b dev git@github.com:samkos/ludion.git


.. [#] pip is a tool for installing and managing Python packages, such as
   those found in the Python Package Index

.. _LGPL v2.1+: https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html
.. _Test Updates: http://fedoraproject.org/wiki/QA/Updates_Testing
.. _EPEL: http://fedoraproject.org/wiki/EPEL


