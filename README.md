you manage your blob on a virtual plot

a tick happens at <t:0:t> and <t:43200:t> (your timezone),
during a tick a blob eats 1 mango,
and each tree has a 25% chance of growing.

> **COMMANDS**

bot prefix is b!

if unspecified, *direction* can be left/right/up/down or just l/r/d/u

*parameter**?*** means its optional, if not specified defaults to 1

> plot/p

view your plot and inventory

> move/mv/m *direction* *amount?*

move in *direction*

> searchfood/sf

collects mangos from 8 tiles around you

> plant *direction*

plants a sapling in *direction*

> chopwood/chop/cw *direction*

chops the tree in *direction*, giving 1-2 wood (50/50) and 0-1 saplings (50/50)

Chopping down saplings doesnt give wood

> craft/c *recipe* *amount?*

currently only 1 recipe:

- **plank**: wood -> 2x plank

> sell *item* *amount?*

sell *item*

sell prices:
- mango - 6$
- wood - 9$
- sapling - 6$
- plank - 7$

> buy *item* *amount?*

buy *item*

buy prices:
- mango - 10$
- wood - 15$
- sapling - 10$
- plank - 10$

> explore/ex *direction*

*direction* can be right/down/horizonal/vertical or r/d/h/v

expanding costs 5$ per tile

new tiles have 25% chance of containing a tree

maximum size of 15x9

> revive/rev *@user*

revive *@user*'s blob

costs 10 mangos
