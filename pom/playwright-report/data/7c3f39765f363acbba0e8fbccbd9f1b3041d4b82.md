# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests for Org and Edu , MSA accounts\accountTests.spec.ts >> Tests for t-deepthi@edunotebook.onmicrosoft.com >> TC2 - Compare top 5 notebooks between OneNote and M365
- Location: pom\tests for Org and Edu , MSA accounts\accountTests.spec.ts:51:9

# Error details

```
Test timeout of 200000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - img "Account manager" [ref=e7]
      - generic [ref=e8]: OneNote
      - img "Account manager" [ref=e9]
      - img "Help" [ref=e10]
      - img "Settings" [ref=e11]
      - img "Feature Flags" [ref=e12]
    - main [ref=e14]:
      - generic [ref=e16]:
        - heading "Welcome, Deepthi R!" [level=1] [ref=e18]
        - region "quick actions" [ref=e21]:
          - button "Create new notebook" [ref=e22]:
            - img [ref=e24]
            - text: Create new notebook
      - region "My notebooks" [ref=e228]:
        - heading "My notebooks" [level=2] [ref=e229]
        - generic [ref=e32]:
          - generic [ref=e33]:
            - progressbar "Loading Content" [ref=e35]
            - table [ref=e38]:
              - rowgroup [ref=e39]:
                - row "Name Opened Activity" [ref=e40]:
                  - columnheader "Name" [ref=e41]:
                    - generic [ref=e42]: Name
                  - columnheader "Opened" [ref=e43]:
                    - generic [ref=e44]: Opened
                  - columnheader "Activity" [ref=e45]:
                    - generic [ref=e46]: Activity
              - rowgroup [ref=e47]:
                - row [ref=e48]:
                  - cell [ref=e49]:
                    - progressbar "Loading Content" [ref=e51]
                  - cell [ref=e54]:
                    - progressbar "Loading Content" [ref=e55]
                  - cell [ref=e57]:
                    - progressbar "Loading Content" [ref=e58]
                - row [ref=e61]:
                  - cell [ref=e62]:
                    - progressbar "Loading Content" [ref=e64]
                  - cell [ref=e67]:
                    - progressbar "Loading Content" [ref=e68]
                  - cell [ref=e70]:
                    - progressbar "Loading Content" [ref=e71]
                - row [ref=e74]:
                  - cell [ref=e75]:
                    - progressbar "Loading Content" [ref=e77]
                  - cell [ref=e80]:
                    - progressbar "Loading Content" [ref=e81]
                  - cell [ref=e83]:
                    - progressbar "Loading Content" [ref=e84]
                - row [ref=e87]:
                  - cell [ref=e88]:
                    - progressbar "Loading Content" [ref=e90]
                  - cell [ref=e93]:
                    - progressbar "Loading Content" [ref=e94]
                  - cell [ref=e96]:
                    - progressbar "Loading Content" [ref=e97]
                - row [ref=e100]:
                  - cell [ref=e101]:
                    - progressbar "Loading Content" [ref=e103]
                  - cell [ref=e106]:
                    - progressbar "Loading Content" [ref=e107]
                  - cell [ref=e109]:
                    - progressbar "Loading Content" [ref=e110]
                - row [ref=e113]:
                  - cell [ref=e114]:
                    - progressbar "Loading Content" [ref=e116]
                  - cell [ref=e119]:
                    - progressbar "Loading Content" [ref=e120]
                  - cell [ref=e122]:
                    - progressbar "Loading Content" [ref=e123]
                - row [ref=e126]:
                  - cell [ref=e127]:
                    - progressbar "Loading Content" [ref=e129]
                  - cell [ref=e132]:
                    - progressbar "Loading Content" [ref=e133]
                  - cell [ref=e135]:
                    - progressbar "Loading Content" [ref=e136]
                - row [ref=e139]:
                  - cell [ref=e140]:
                    - progressbar "Loading Content" [ref=e142]
                  - cell [ref=e145]:
                    - progressbar "Loading Content" [ref=e146]
                  - cell [ref=e148]:
                    - progressbar "Loading Content" [ref=e149]
                - row [ref=e152]:
                  - cell [ref=e153]:
                    - progressbar "Loading Content" [ref=e155]
                  - cell [ref=e158]:
                    - progressbar "Loading Content" [ref=e159]
                  - cell [ref=e161]:
                    - progressbar "Loading Content" [ref=e162]
                - row [ref=e165]:
                  - cell [ref=e166]:
                    - progressbar "Loading Content" [ref=e168]
                  - cell [ref=e171]:
                    - progressbar "Loading Content" [ref=e172]
                  - cell [ref=e174]:
                    - progressbar "Loading Content" [ref=e175]
                - row [ref=e178]:
                  - cell [ref=e179]:
                    - progressbar "Loading Content" [ref=e181]
                  - cell [ref=e184]:
                    - progressbar "Loading Content" [ref=e185]
                  - cell [ref=e187]:
                    - progressbar "Loading Content" [ref=e188]
                - row [ref=e191]:
                  - cell [ref=e192]:
                    - progressbar "Loading Content" [ref=e194]
                  - cell [ref=e197]:
                    - progressbar "Loading Content" [ref=e198]
                  - cell [ref=e200]:
                    - progressbar "Loading Content" [ref=e201]
                - row [ref=e204]
          - progressbar "Loading Content" [ref=e206]
      - generic [ref=e208]:
        - link "Install Microsoft 365 apps" [ref=e210] [cursor=pointer]:
          - /url: https://go.microsoft.com/fwlink/?linkid=2341472&clcid=0x409
          - img [ref=e212]
          - text: Install Microsoft 365 apps
        - button "Provide feedback" [ref=e231]:
          - img [ref=e232]
  - img [ref=e222]
```