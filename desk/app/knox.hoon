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
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%knox-action mark)
  =/  act  !<(action vase)
  ~&  >>  "that action was a {<-.act>}"
  ?-  -.act
      %add 
    =/  id  (~(rad og eny:bowl) (pow 2 32))  :: basic id handling, should improve
    :_  
    ?.  (~(has by vault) id)
      this(vault (~(put by vault) id `entry`[website.act username.act password.act now:bowl]))
    this(vault (~(put by vault) (add id 1) `entry`[website.act username.act password.act now:bowl])) :: if this doesn't prevent collision then it wasn't meant to be
    [%give %fact ~[/updates] %knox-update !>(`update`act)]~
      ::
      %del
    :_  this(vault (~(del by vault) id.act))
    [%give %fact ~[/updates] %knox-update !>(`update`act)]~
      ::
      %edit
    :_  this(vault (~(put by vault) id.act `entry`[website.act username.act password.act now:bowl]))
    [%give %fact ~[/updates] %knox-update !>(`update`act)]~
      %sett
    `this(settings (~(put by settings) setting-key.act [setting-val.act]))
 ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  ?=([%updates ~] path)
  :: [%updates ~]  `this
  :_  this
  [%give %fact ~ %knox-update !>(`update`[%init settings])]~
  :: [%give %fact ~ %knox-update !>(`update`[%del `id`2])]~
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-peek:def path)
    [%x %generate ~]  ``noun+!>(eny.bowl)
    :: .^(@ %gx /=knox=/generate/noun)
     [%x %init ~]  ``noun+!>([vault settings])
    :: ``noun+!>(`update`[%init vault settings])
    :: in dojo, first build knoxsur from /=knox=/sur/knox/hoon, then scry
    :: =knoxsur -build-file /=knox=/sur/knox/hoon
    :: .^([vault:knoxsur settings:knoxsur] %gx /=knox=/init/noun)
   ==
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo  on-arvo:def
++  on-fail  on-fail:def
--