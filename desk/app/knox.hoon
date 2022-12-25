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
  ?-  -.act
      %add 
    =/  id  (~(rad og eny:bowl) (pow 2 32))  :: basic id handling, should improve
    ?.  (~(has by vault) id)  :: if this doesn't prevent collision then it wasn't meant to be
      `this(vault (~(put by vault) id `entry`[website.act username.act password.act now:bowl]))
    `this(vault (~(put by vault) (add id 1) `entry`[website.act username.act password.act now:bowl])) 
      ::
      %del
    `this(vault (~(del by vault) id.act))
      ::
      %edit
    `this(vault (~(put by vault) id.act `entry`[website.act username.act password.act now:bowl]))
      %sett
    `this(settings (~(put by settings) setting-key.act [setting-val.act]))
    :: below is an example of sending an update with :_
      %gen
    :_
      this(vault vault)
    [%give %fact ~[/updates] %knox-update !>(`update`[%enty `enty`(~(rad og eny:bowl) (pow 2 32))])]~
 ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  ?=([%updates ~] path)
  :_  
    ?:  (~(has by settings) `@tas`'showWelcome')
      this
    this(settings (~(put by settings) `setting-key`'showWelcome' [`setting-val`'true']))
  [%give %fact ~ %knox-update !>(`update`[%init vault settings])]~
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-peek:def path)
      [%x %vault ~]
    :^  ~  ~  %knox-update
    !>  ^-  update
    [%vault vault]
      [%x %settings ~]
    :^  ~  ~  %knox-update
    !>  ^-  update
    [%settings settings]
      [%x %enty ~]
    :^  ~  ~  %knox-update
    !>  ^-  update
    [%enty (~(rad og eny:bowl) (pow 2 32))]
   ==
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo  on-arvo:def
++  on-fail  on-fail:def
--