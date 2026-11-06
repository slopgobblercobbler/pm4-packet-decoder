#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegIndexMaskDef {
    static constexpr std::uint8_t opcode = 0x4d;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_INDEX_MASK";
    static constexpr std::string_view desc = "Masked context register write with index offset";
};
}
