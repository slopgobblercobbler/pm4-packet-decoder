#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetContextRegOffsetDef {
    static constexpr std::uint8_t opcode = 0x4f;
    static constexpr std::string_view name = "IT_SET_CONTEXT_REG_OFFSET";
    static constexpr std::string_view desc = "Write context register relative to dynamic register bank base";
};
}
