|%
+$  website   @t
+$  username  @t
+$  password  @t
+$  updated   @da
+$  id        @ud  :: change this to dif type
+$  entry  [=website =username =password =updated]
+$  setting  [@t @t]
:: poke actions
+$  action
  $%  [%add =entry]
      [%edit =id =entry]
      [%del =id]
  ==
+$  update
  %+  pair  @
  $%  action
      :: idk if this is right but it compiles for now
      [%vault =vault] 
      [%settings =settings]
  ==
:: types for agent state
+$  vault  (map id entry)
+$  settings  (list setting)
--