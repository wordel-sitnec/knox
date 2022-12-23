|%
+$  website   @t
+$  username  @t
+$  password  @t
+$  updated   @da
+$  id        @ud  :: change this to dif type
+$  entry  [=website =username =password =updated]
+$  enty  @ud
+$  setting-key  @t
+$  setting-val  @t
:: poke actions
+$  action
  $%  [%add =website =username =password]
      [%edit =id =website =username =password]
      [%del =id]
      [%gen =enty]
      [%sett =setting-key =setting-val]
  ==
+$  update
  $%  [%init =vault =settings]
      [%vault =vault]
      [%enty =enty]
      action
  ==
:: types for agent state
+$  vault  (map id entry)
+$  settings  (map setting-key setting-val)
--