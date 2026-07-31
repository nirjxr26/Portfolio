const ALLOWLIST = new Set(
  [
    "#17150E",
    "#14120B",
    "#1B1913",
    "#252219",
    "#201E18",
    "#1F1C16",
    "#1D1B16",
    "#221F18",
    "#23201C",
    "#4A443B",
    "#252118",
    "#26241E",
    "#13110B",
    "#D4D4D8",
    "#6B6B70",
    "#F54E00",
    "#E04500",
    "#EDECEC",
    "#0C0A05",
    "#2563EB",
    "#1d4ed8",
    "#3b82f6",
    "#10b981",
    "#22c55e",
    "#ef4444",
    "#eab308",
    "#f59e0b",
    "#a78bfa",
    "#E5E7EB",
    "#a1a1aa",
    "#71717a",
  ].map((c) => c.toLowerCase())
);

const HEX_RE = /#([0-9a-fA-F]{6})\b/g;

function getAttributeStringValue(attr) {
  const value = attr.value;
  if (value == null) {
    return null;
  }
  if (value.type === "Literal" && typeof value.value === "string") {
    return value.value;
  }
  if (
    value.type === "JSXExpressionContainer" &&
    value.expression != null &&
    value.expression.type === "TemplateLiteral"
  ) {
    return value.expression.quasis.map((q) => q.value.cooked ?? "").join("");
  }
  return null;
}

const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Hardcoded hex color — use a design token or the artifact allowlist.",
    },
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name == null || node.name.name !== "className" && node.name.name !== "style") {
          return;
        }
        const raw = getAttributeStringValue(node);
        if (raw == null) {
          return;
        }
        let match;
        HEX_RE.lastIndex = 0;
        while ((match = HEX_RE.exec(raw)) !== null) {
          if (!ALLOWLIST.has(match[0].toLowerCase())) {
            context.report({
              node,
              message: `Hardcoded hex color ${match[0]} — use a design token or the artifact allowlist.`,
            });
          }
        }
      },
    };
  },
};

export default rule;
