/-  *knox
|%
++  dejs-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%add (ot ~[website+so username+so password+so])]
      [%edit (ot ~[id+ni website+so username+so password+so])]
      [%del (ot ~[id+ni])]
      [%sett (ot ~[setting-key+so setting-val+so])]
  ==
++  enjs-update
  =,  enjs:format
  |=  upd=update
  ^-  json
  ~&  >>  "update: {<upd>}"
  |^
  ?-  -.upd
           %del  (frond 'del' s+(scot %ud id.upd))
           %add  
        %+  frond  'add'
        %-  pairs
        :~  ['website' s+website.upd]
            ['username' s+username.upd]
            ['password' s+password.upd]
        ==
           %edit
        %+  frond  'edit'
        %-  pairs
        :~  ['website' s+website.upd]
            ['username' s+username.upd]
            ['password' s+password.upd]
            ['id' s+(scot %ud id.upd)]
        ==
           %sett  !!
          ::  below is example turning settings into list and then passing to setsets
           %init
        %+  frond  'init'
        %-  pairs  
        :~  ['settings' a+(turn ~(tap by settings.upd) setsets)]
        ==
          ::  (frond 'init' a+(turn ~(tap by settings.upd) setsets))
          :: %init  (frond 'init' o+(~(rut by settings.upd) setsets))
          ::  (frond 'init' (~(run by settings.upd) setsets))
        :: %+  frond  'init'
        :: %-  pairs
        :: :~  ['key' s+(scot %tas 'val')]
        :: ==
        :: %+  frond  'init'
        :: %-  pairs
        :: :~  ['']
        :: frond 'init' s+(scot %t 'hi'))
    ==
  --
  ++  setsets
      |=  setts=[@t @t]
      ~&  >>  "setts {<setts>}"
      ~&  >>  "- {<-.setts>}"
      (frond:enjs:format `@t`-.setts s+(scot %tas +.setts))
      :: !!
      :: (frond:enjs:format `@t`p.setts s+(scot %t q.setts))
      :: |=  setts=@t
  ::     (frond:enjs:format 'hi' s+(scot %t setts))
  ::
  ::
  :: ++  vault
  ::   :-  %o
  ::   :~  ['id' (numb id.vault.upd)]
  ::       ['entry' (entry entry.vault.upd)]
  ::   ==
  :: ++  entry
  ::   :-  %o
  ::   :~  [%s website.vault.upd]
  ::       [%s username.vault.upd]
  ::       [%s password.vault.upd]
  ::   ==
--