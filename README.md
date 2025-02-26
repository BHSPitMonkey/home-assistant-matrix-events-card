# Matrix Events Card for Home Assistant

Inspired by https://old.reddit.com/r/homeassistant/comments/1ixyzq2/im_made_a_screen_saver_that_displays_all_my_mqtt/

## Installation with HACS

1. Go to HACS
2. Open the menu (⋮) and select Custom Repositories
3. Enter this repository in the text box: `https://github.com/BHSPitMonkey/home-assistant-matrix-events-card`
4. Select type "Dashboard"
5. Click "Add"
6. Search for "Matrix Events Card"
7. Click "Download" and reload when prompted

## Usage

Add a "Manual" card with the following YAML config:

```yaml
type: "custom:matrix-events-card"
```

For maximum effect, add this to a dashboard view with the "Panel (single card)" layout!
