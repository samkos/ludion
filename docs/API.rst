Ludion's API
============


At this stage, *Ludion* API is still under development. For now, its public
API is only available as Unix commands and NodeJS, Python and Dart
languages are expected to be supported in the near future. 

Currently under development and test, the following Unix commands are
planned to be released with the first stable release of *ludion* expected
by November 2020:

- **registerService**, to register a new service,
- **getService**, to get details about a service already deployed,
- **updateService**, to update values relative to a service expected to
  be published on **Ludion**'s dashboard,
- **listServices**, to list all available services,
- **setServiceTrigger**, to establish a graphical widget in the
  Ludion's dashboard in the view related to the current service and
  triggers its activation to an action executed immediately in the
  corresponding job


  
their use will be detailed here.


registerService
---------------

Purpose:
  register a service in Ludion

Usage:
::
  registerService.js --service [serviceName] --instance [instanceName]

Options:
::
  --version        Show version number                                 [boolean]
  -s, --service    Name of the service                                [required]
  -i, --instance   Name of the instance                               [required]
  -h, --help       Show help                                           [boolean]
  -u, --user       given user | all                               [ ADMIN ONLY ]
  -Z, --not-admin  act as regular user, abolish admin privileges  [ ADMIN ONLY ]
  -e, --endpoint   Endpoint
  -d, --debug      Adds debug trace
  -j, --job        job #

Example:
::
  registerService.js -s Jupyter -i myBook
  
    -> launch a Jupyter note book service. It will appear in the dashboard
       as the instance *myBook* of the service *Jupyter*.

getService
----------

Purpose:
  get current status and parameters for a given service registered in Ludion

Usage:
::

  getService --service <serviceName> --instance <instanceName>
             [ --parameter param1[,param2,..] | --all-parameters ]

Options:
::
  --version             Show version number                            [boolean]
  -s, --service         Name of the service
  -i, --instance        Name of the instance
  -h, --help            Show help                                      [boolean]
  -u, --user            given user | all                               [ ADMIN ONLY ]
  -Z, --not-admin       act as regular user, abolish admin privileges  [ ADMIN ONLY ]
  -d, --debug           Adds debug trace
  -a, --all-parameters  returns the value of all parameters
  -p, --parameter       return the value of parameter listed

Examples:
::
  getService.js -s Jupyter -i myBook       -> returns the current status of the instance *myBook*
                                              of the service *Jupyter*


  getService.js -s Jupyter -i myBook  -a   -> returns all parameter of the instance *myBook*
                                              of the service *Jupyter*



				      
updateService
-------------

Purpose:
  update status and/or parameters for a given service registered in Ludion

Usage:
::
  updateService --service <serviceName> --instance <instanceName>
                [ --param1 value1 [ --param2 value2 ...] ]

Options:
::
  --version        Show version number                                 [boolean]
  -s, --service    Name of the service
  -i, --instance   Name of the instance
  -h, --help       Show help                                           [boolean]
  -u, --user       given user | all                               [ ADMIN ONLY ]
  -Z, --not-admin  act as regular user, abolish admin privileges  [ ADMIN ONLY ]
  -d, --debug      Adds debug trace

Examples:
::
  updateService.js -s Jupyter -i myBook  -x 1 -y 2
  -> set to 1 and 2  the resepctive parameters x and y of a
     the instance *myBook* of the service *Jupyter*


listServices
------------

Purpose:
  list services registered in Ludion

Usage:
::
listServices.js [ --long ] [--json]
        [ --service <serviceName> ] [ --instance <instanceName> ]

Options:
::
  --version        Show version number                                 [boolean]
  -s, --service    Name of the service
  -i, --instance   Name of the instance
  -h, --help       Show help                                           [boolean]
  -u, --user       given user | all                               [ ADMIN ONLY ]
  -Z, --not-admin  act as regular user, abolish admin privileges  [ ADMIN ONLY ]
  -l, --long       long format
  -j, --json       json format
  -d, --debug      Adds debug trace

Examples:
::
  listServices.js -u johndoe  -> list all services belonging to user johndoe
     
setServiceTrigger
-----------------

Purpose:
  connect a widget of a service in Ludion to a local script

Usage:
::
  setServiceTrigger --service <serviceName> --instance <instanceName>
                    --widget <widget_type> --label xxx --calls <script>


Options:
::
  --version        Show version number                                 [boolean]
  -s, --service    Name of the service
  -i, --instance   Name of the instance
  -h, --help       Show help                                           [boolean]
  -u, --user       given user | all                               [ ADMIN ONLY ]
  -Z, --not-admin  act as regular user, abolish admin privileges  [ ADMIN ONLY ]
  -w, --widget     Type of widget to add
  -l, --label      Widget configuration parameters
  -c, --calls      Absolute path to script to trigger
  -d, --debug      Adds debug trace

Examples:
::
  setServiceTrigger.js -s Jupyter -i        -> a click on Button "Save me"
  myBook --widget Button --label "Save me"  triggers a call to run_save.sh
  --calls run_save.sh
