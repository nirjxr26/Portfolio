# Changes to execute in BastionClient.tsx

## 1. Window chrome — remove text, darker bg
- Remove `<span>bastion</span>` line
- Change `bg-[#1E1F2B]` to `bg-[#0D0F17]`
- Change `border-white/10` to `border-white/5`

## 2. Sidebar logo — remove icon, bigger font
- Remove the `<Shield>` icon + gradient wrapper div (lines 236-238)
- Change `text-xs font-semibold` to `text-base font-bold` on "Bastion"
- Increase `mb-4` to `mb-6`

## 3. Sidebar color — darker blue shade
- Change `bg-[#162044]` to `bg-[#0B1120]`

## 4. Sidebar items — more breathing room
- Container: `gap-0.5 p-2 md:p-3` → `gap-1 p-3 md:p-4`
- All nav items: `px-2.5 py-1.5` → `px-3 py-2`
- Category headers: `mb-0.5` → `mb-1`, `mt-2` → `mt-4`
- Category header labels: `px-2` → `px-3`
- Sub-group divs: `gap-0.5` → `gap-1`
