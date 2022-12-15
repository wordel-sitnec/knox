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
  ?>  ?=(%knox-action mark)
  =/  act  !<(?([%sub =@p] [%unsub =@p]) vase)
  ?-    -.act
      %sub
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
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?-  p.sign
      ((slog  '%knox-follower: subscribe succeeded!' ~) `this)
    ((slog  '%knox-follower: subscribe failed!' ~) `this)
  ::
      %kick
    %-  (slog '%knox-follower Got kick, resubscribing...' ~)
    :_  this
    [%pass /values-wire %agent [src.bowl %knox] %watch /values]~
  ::
    %fact
    ~&  >>  fact-p.cage.sign
    ?>  ?=(%knox-update p.cage.sign)
    ~&  >>  !<(update q.cage.sign)
    `this
  ==
++  on-watch  on-watch:default
++  on-peek   on-peek:default
++  on-init   on-init:default
++  on-save   on-save:default
++  on-load   on-load:default
++  on-arvo   on-arvo:default
++  on-leave  on-leave:default
++  on-fail   on-fail:default
--