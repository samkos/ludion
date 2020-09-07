=====================
 What is *Ludion*?
=====================

Developped by the KAUST Supercomputing Laboratory (KSL), *Ludion* is a
service-oriented hybrid architecture, well-adapted to launch, monitor
and steer interactive services spawned either on on-premise HPC
resources, on user laptop and workstation or in the Cloud.  Based on
AWS serverless components, requiring no special priviledges to be
deployed, it consists in a catalog of services and a dashboard hosted
in the Cloud and a set of commands to install on the Resources to
cover. From a running job, a user can register and
publish his new service and any relevant data related on a centralized
dashboard.


*Ludion* is released as an Open Source Software under BSD Licence.
It is available at http://github.org/samkos/ludion

Features
--------

*Ludion* allows a user to:

- "publish" his own service via a centralized web interface and API.
  This service can be hosted either on-premise HPC, on his local
  workstation or in the cloud.
- dynamically update any information judged of interest about
  the published service
- make user-defined widget appear on the website in the view related
  to a given service. When clicked-on or filled and submitted, these
  widget trigger immediate action from the service hosted on
  resource.
