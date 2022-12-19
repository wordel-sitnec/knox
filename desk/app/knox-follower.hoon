/-  *knox
/+  default-agent, dbug, agentio
|%
+$  card  card:agent:gall
--
%-  agent:dbug
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    io    ~(. agentio bowl)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  ?=(%noun mark)
  =/  action  !<(?([%sub =@p] [%unsub =@p]) vase)
  ?-    -.action
      %sub
    ~&  >>  action
    :_  this
    [%pass /values-wire %agent [p.action %knox] %watch /values]~
  ::
      %unsub
    :_  this
    [%pass /values-wire %agent [p.action %knox] %leave ~]~
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?>  ?=([%values-wire ~] wire)
  ?+    -.sign  (on-agent:def wire sign)
      %watch-ack
    ?~  p.sign
      ((slog '%knox-follower: subscribe succeeded!' ~) `this)
    ((slog '%knox-follower: subscribe failed!' ~) `this)
  ::
      %kick
    %-  (slog '%knox-follower: Got kick, resubscribing...' ~)
    :_  this
    [%pass /values-wire %agent [src.bowl %knox] %watch /values]~
  ::
    %fact
    ~&  >>  fact+p.cage.sign
    ?>  ?=(%knox-update p.cage.sign)
    ~&  >>  !<(update q.cage.sign)
    `this
  ==
++  on-watch  on-watch:def
++  on-peek   on-peek:def
++  on-init   on-init:def
++  on-save   on-save:def
++  on-load   on-load:def
++  on-arvo   on-arvo:def
++  on-leave  on-leave:def
++  on-fail   on-fail:def
--