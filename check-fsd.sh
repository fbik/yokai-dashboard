#!/bin/bash

echo "🔍 FSD Structure Validation"
echo "==========================="

# Check critical files
echo "1. Critical files:"
files=(
  "src/entities/spirit/model/types.ts"
  "src/entities/spirit/api/spiritApi.ts"
  "src/features/monitoring/ui/MonitoringPage.tsx"
  "src/widgets/tokyo-map/ui/TokyoMap.tsx"
  "src/widgets/control-panel/ui/ControlPanel.tsx"
  "src/shared/lib/providers/ReactQueryProvider.tsx"
  "src/app/layout.tsx"
  "src/app/page.tsx"
)

all_ok=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $(basename $file)"
  else
    echo "   ❌ $(basename $file) - MISSING"
    all_ok=false
  fi
done

echo ""
echo "2. TypeScript compilation:"
npx tsc --noEmit 2>&1 | grep -q "error" && {
  echo "   ❌ TypeScript errors found"
  npx tsc --noEmit 2>&1 | grep "error" | head -5
  all_ok=false
} || echo "   ✅ No TypeScript errors"

echo ""
echo "3. Server status:"
if curl -s http://localhost:3000/api/health > /dev/null; then
  echo "   ✅ Server is running"
else
  echo "   ❌ Server is not responding"
  all_ok=false
fi

echo ""
if [ "$all_ok" = true ]; then
  echo "🎉 All checks passed! FSD structure is valid."
  echo "🌐 Access: http://localhost:3000"
else
  echo "⚠️  Some checks failed. Review the errors above."
fi
