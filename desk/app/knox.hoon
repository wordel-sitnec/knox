/-  *knox
/+  default-agent, dbug, agentio
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =vault =settings]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    io    ~(. agentio bowl)
++  on-init  on-init:def
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  `this(state !<(versioned-state old-vase))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  ?=(%knox-action mark)
  =/  act  !<(action vase)
  ~&  >>  "entry of action is {<+.act>}"
  ?-  -.act
      %add
    ?>  =(our.bowl src.bowl)
    `this(vault [entry.act vault])
     %del  !!
     %edit  !!    
  ==
::
++  on-watch  on-watch:def
  :: |=  =path
  :: ^-  (quip card _this)
  :: ?>  (team:title our.bowl src.bowl)
  :: ?+  path  (on-watch:def path)
  ::   [%updates ~] `this
  :: ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-peek:def path)
    [%x %generate ~]  ``noun+!>(eny.bowl)
    :: .^(@ %gx /=knox=/generate/noun)
    [%x %init ~]  ``noun+!>([vault settings])
    :: in dojo, first build knoxsur from /=knox=/sur/knox/hoon, then
    :: .^([vault:knoxsur settings:knoxsur] %gx /=knox=/init/noun)
   ==
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo  on-arvo:def
++  on-fail  on-fail:def
--