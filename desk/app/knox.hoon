/-  *knox
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =entries]
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
  ?-  -.act
      %add
    ?:  =(our.bowl target.act)
      `this(entries [entry.act entries])
    ?>  =(our.bowl src.bowl)
    :_  this
    [%pass /pokes %agent [target.act %knox] %poke mark vase]~
  ==
::
++  on-watch  
  |=  =path
  ^-  (quip card _this)
  ?>  ?=([%vault ~] path)
  :_  this
  [%give %fact ~ ~ !>(`update`[%init entries])]~
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %vault ~]  ``noun+!>(entries)
  ==
++  on-arvo  on-arvo:def
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-fail  on-fail:def
--